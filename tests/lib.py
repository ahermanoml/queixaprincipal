"""Helpers for the dev-only browser checks (Python 3 + Playwright + Chrome; no npm).

Nothing here is loaded by the site itself."""
import contextlib, os, shutil, socket, subprocess, sys, tarfile, tempfile, io, time

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHROME = os.environ.get("CHROME", "/usr/bin/google-chrome")

# Records clipboard writes instead of touching the real clipboard (headless Chrome has none).
CLIPBOARD_STUB = """
(() => {
  window.__clip = null;
  const cb = { writeText: t => { window.__clip = String(t); return Promise.resolve(); } };
  try { Object.defineProperty(Navigator.prototype, 'clipboard', { get: () => cb, configurable: true }); } catch (e) {}
  window.confirm = () => true;
})();
"""


def export_ref(ref):
    """Extract the tracked files of a git ref into a temp dir (works for the old single-file site too)."""
    out = tempfile.mkdtemp(prefix="qp-ref-")
    data = subprocess.run(["git", "-C", REPO, "archive", "--format=tar", ref],
                          check=True, capture_output=True).stdout
    with tarfile.open(fileobj=io.BytesIO(data)) as t:
        t.extractall(out, filter="data")
    return out


def free_port():
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


@contextlib.contextmanager
def http_server(root):
    port = free_port()
    # -I and --directory: nothing from the served folder is ever imported (it may be downloaded input)
    p = subprocess.Popen([sys.executable, "-I", "-m", "http.server", str(port), "--bind", "127.0.0.1", "--directory", os.path.abspath(root)],
                         cwd="/", stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    try:
        for _ in range(100):
            try:
                socket.create_connection(("127.0.0.1", port), 0.1).close()
                break
            except OSError:
                time.sleep(0.05)
        yield f"http://127.0.0.1:{port}/"
    finally:
        p.terminate()
        p.wait()


def file_url(root):
    return "file://" + os.path.join(os.path.abspath(root), "index.html")


@contextlib.contextmanager
def browser():
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path=CHROME, args=["--no-sandbox"])
        try:
            yield b
        finally:
            b.close()


class Page:
    """A page plus everything it logged: console errors/warnings, page errors, non-local requests."""

    def __init__(self, browser, url, width=1440, height=900):
        self.ctx = browser.new_context(viewport={"width": width, "height": height})
        self.ctx.add_init_script(CLIPBOARD_STUB)
        self.page = self.ctx.new_page()
        # nothing outside this machine is ever fetched (the original Ficha Vermelha pages ask for Google Fonts)
        self.page.route("**/*", lambda r: r.continue_() if r.request.url.startswith(("file://", "http://127.0.0.1", "data:", "about:"))
                        else r.abort())
        self.problems = []
        # "Failed to load resource" console lines carry no URL; failed responses are checked below instead
        self.page.on("console", lambda m: m.type in ("error", "warning") and
                     not m.text.startswith("Failed to load resource") and
                     self.problems.append(f"console.{m.type}: {m.text}"))
        # /favicon.ico 404s on http.server and GitHub Pages alike (the site has no favicon); anything else is a problem
        self.page.on("response", lambda r: r.status >= 400 and not r.url.endswith("/favicon.ico") and
                     self.problems.append(f"HTTP {r.status}: {r.url}"))
        self.page.on("pageerror", lambda e: self.problems.append(f"pageerror: {e}"))
        self.page.on("requestfailed", lambda r: self.problems.append(f"requestfailed: {r.url}"))
        self.page.on("request", lambda r: (not r.url.startswith(("file://", "http://127.0.0.1", "data:")))
                     and self.problems.append(f"external request: {r.url}"))
        self.page.goto(url)
        self.page.wait_for_load_state("load")

    def close(self):
        self.ctx.close()


class Report:
    def __init__(self, name):
        self.name, self.fails, self.notes = name, [], []

    def check(self, cond, msg):
        if not cond:
            self.fails.append(msg)
        return cond

    def note(self, msg):
        self.notes.append(msg)
        print(f"  [{self.name}] {msg}", flush=True)

    def done(self):
        status = "OK" if not self.fails else f"FAIL ({len(self.fails)})"
        print(f"== {self.name}: {status}", flush=True)
        for f in self.fails[:40]:
            print("   - " + f, flush=True)
        if len(self.fails) > 40:
            print(f"   ... {len(self.fails) - 40} more", flush=True)
        return not self.fails

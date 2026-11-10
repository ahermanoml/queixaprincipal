#!/usr/bin/env python3
"""Run every dev check against the working tree.

  python3 tests/run.py                 # parity vs main + features + smoke, file:// and http://
  python3 tests/run.py --ref HEAD~1    # compare against another git ref
  python3 tests/run.py --quick         # parity on 3 conditions only (instead of all 64)
  python3 tests/run.py --shots DIR     # also save screenshots into DIR
  python3 tests/run.py --fv DIR        # also compare Escores with a local copy of fichavermelha.pages.dev
  python3 tests/run.py --fv DIR --write-fixtures   # ... and refreeze tests/fixtures/escores.json from it

Requires Python 3 + Playwright (pip) + Chrome (/usr/bin/google-chrome, or set CHROME=...). No npm."""
import argparse, os, shutil, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from lib import REPO, browser, export_ref, file_url, http_server
import parity, escores_golden, escores_parity, escores_layout

try:
    import features
except ImportError:
    features = None
try:
    import shots
except ImportError:
    shots = None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--ref", default="main", help="git ref to compare against (default: main)")
    ap.add_argument("--quick", action="store_true", help="parity on 3 conditions instead of all")
    ap.add_argument("--shots", metavar="DIR", help="save screenshots into DIR")
    ap.add_argument("--fv", metavar="DIR", help="local copy of fichavermelha.pages.dev: compare Escores with the original")
    ap.add_argument("--write-fixtures", action="store_true", help="with --fv: rewrite tests/fixtures/escores.json from the original")
    a = ap.parse_args()

    old_root = export_ref(a.ref)
    ok = True
    try:
        with browser() as b, http_server(old_root) as old_http, http_server(REPO) as new_http:
            print(f"# parity vs {a.ref} over file://", flush=True)
            ok &= parity.run(b, file_url(old_root), file_url(REPO), old_root, REPO, full=not a.quick)
            print(f"# parity vs {a.ref} over http://", flush=True)
            ok &= parity.run(b, old_http, new_http, old_root, REPO, full=not a.quick)
            for label, url in (("file://", file_url(REPO)), ("http://", new_http)):
                print(f"# escores golden fixtures over {label}", flush=True)
                ok &= escores_golden.run(b, url)
            print("# escores layout (1366x768, 1280x720, 1024x768, 1440x900)", flush=True)
            ok &= escores_layout.run(b, file_url(REPO))
            if a.fv:
                with http_server(a.fv) as fv_http:
                    print("# escores vs Ficha Vermelha (original site, local copy)", flush=True)
                    ok &= escores_parity.run(b, fv_http, a.fv, new_http,
                                             os.path.join(REPO, "tests/fixtures/escores.json") if a.write_fixtures else None)
            if features:
                for label, url in (("file://", file_url(REPO)), ("http://", new_http)):
                    print(f"# features over {label}", flush=True)
                    ok &= features.run(b, url)
            if shots and a.shots:
                ok &= shots.run(b, file_url(REPO), a.shots)
    finally:
        shutil.rmtree(old_root, ignore_errors=True)
    print("\nALL OK" if ok else "\nSOME CHECKS FAILED")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())

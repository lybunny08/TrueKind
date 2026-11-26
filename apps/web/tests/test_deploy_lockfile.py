"""Vérifie que le lockfile permet un build Vercel sur Linux.

Le lockfile doit contenir les binaires natifs Linux des dépendances utilisées
pendant `next build`, même si le lockfile a été généré depuis Windows.
"""

import json
import unittest
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[3]
LOCKFILE = REPO_ROOT / "package-lock.json"

LINUX_BINARIES = (
    "node_modules/lightningcss-linux-x64-gnu",
    "node_modules/@tailwindcss/oxide-linux-x64-gnu",
    "node_modules/@next/swc-linux-x64-gnu",
    "node_modules/@img/sharp-linux-x64",
    "node_modules/@unrs/resolver-binding-linux-x64-gnu",
)


class DeployLockfileTest(unittest.TestCase):
    def test_lockfile_includes_linux_native_binaries(self):
        packages = json.loads(LOCKFILE.read_text(encoding="utf-8"))["packages"]

        missing = [name for name in LINUX_BINARIES if name not in packages]
        self.assertEqual(
            missing, [], msg=f"binaires Linux absents du lockfile : {', '.join(missing)}"
        )


if __name__ == "__main__":
    unittest.main(verbosity=2)

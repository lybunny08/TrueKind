"""Vérifie que Lenis fournit un scroll fluide sans casser le tiroir panier.

Le serveur de dev doit répondre sur http://localhost:3000.
"""

import unittest

from playwright.sync_api import sync_playwright

BASE_URL = "http://localhost:3000"


class LenisSmoothScrollTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.playwright = sync_playwright().start()
        cls.browser = cls.playwright.chromium.launch(headless=True)

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.playwright.stop()

    def open_home(self, **context_options):
        context = self.browser.new_context(**context_options)
        page = context.new_page()
        page.goto(BASE_URL, wait_until="networkidle")
        page.wait_for_selector(".preloader", state="hidden", timeout=10000)
        return context, page

    def test_wheel_scroll_is_animated(self):
        context, page = self.open_home(viewport={"width": 1440, "height": 900})
        try:
            classes = page.evaluate("() => document.documentElement.className")
            self.assertIn("lenis", classes, msg="classe Lenis absente")

            page.evaluate("() => window.scrollTo(0, 0)")
            page.mouse.move(720, 450)
            page.mouse.wheel(0, 900)
            page.wait_for_timeout(50)
            self.assertTrue(
                page.evaluate("() => document.documentElement.classList.contains('lenis-smooth')"),
                msg="smooth scroll désactivé pendant la molette",
            )
            initial = page.evaluate("() => window.scrollY")
            page.wait_for_timeout(200)
            intermediate = page.evaluate("() => window.scrollY")
            page.wait_for_timeout(1600)
            final = page.evaluate("() => window.scrollY")

            self.assertGreater(final, 100, msg="le scroll n'a pas avancé")
            self.assertLess(initial, final, msg="le scroll a sauté instantanément")
            self.assertLessEqual(intermediate, final, msg="le scroll a reculé pendant l'animation")
        finally:
            context.close()

    def test_reduced_motion_uses_native_scroll(self):
        context, page = self.open_home(
            viewport={"width": 1440, "height": 900}, reduced_motion="reduce"
        )
        try:
            classes = page.evaluate("() => document.documentElement.className")
            self.assertIn("lenis", classes, msg="classe Lenis absente")

            page.evaluate("() => window.scrollTo(0, 0)")
            page.mouse.move(720, 450)
            page.mouse.wheel(0, 900)
            page.wait_for_timeout(150)
            early = page.evaluate("() => window.scrollY")
            page.wait_for_timeout(1600)
            final = page.evaluate("() => window.scrollY")

            self.assertGreater(final, 100, msg="le scroll n'a pas avancé")
            self.assertGreaterEqual(
                early, final * 0.9, msg="reduced-motion doit suivre la molette sans interpolation"
            )
        finally:
            context.close()

    def test_cart_list_is_excluded_from_smooth_scroll(self):
        context, page = self.open_home(viewport={"width": 1440, "height": 900})
        try:
            page.locator("#cart-nav").click()
            page.wait_for_selector(".cart-drawer__list", state="visible")
            self.assertEqual(
                page.locator(".cart-drawer__list[data-lenis-prevent]").count(),
                1,
                msg="la liste du panier doit garder son scroll natif",
            )
        finally:
            context.close()


if __name__ == "__main__":
    unittest.main(verbosity=2)

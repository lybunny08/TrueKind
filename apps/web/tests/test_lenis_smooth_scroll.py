"""Vérifie que Lenis fournit un scroll fluide sans casser le tiroir panier.

Le serveur de dev doit répondre sur http://localhost:3000.
"""

import unittest

from playwright.sync_api import sync_playwright

BASE_URL = "http://localhost:3000"

START_FRAME_RECORDER = """() => {
  window.__frames = [];
  const tick = () => {
    window.__frames.push(window.scrollY);
    if (window.__frames.length < 200) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}"""


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

    def record_wheel_frames(self, page):
        page.evaluate("() => window.scrollTo(0, 0)")
        page.evaluate(START_FRAME_RECORDER)
        page.mouse.move(720, 450)
        page.mouse.wheel(0, 900)
        page.wait_for_timeout(1800)
        frames = page.evaluate("() => window.__frames")
        final = frames[-1]
        return final, [y for y in frames if 0 < y < final * 0.9]

    def test_wheel_scroll_is_animated(self):
        context, page = self.open_home(viewport={"width": 1440, "height": 900})
        try:
            classes = page.evaluate("() => document.documentElement.className")
            self.assertIn("lenis", classes, msg="classe Lenis absente")

            final, intermediate = self.record_wheel_frames(page)
            self.assertGreater(final, 100, msg="le scroll n'a pas avancé")
            self.assertGreaterEqual(
                len(intermediate), 2, msg="le scroll doit passer par des positions intermédiaires"
            )
        finally:
            context.close()

    def test_reduced_motion_uses_native_scroll(self):
        context, page = self.open_home(
            viewport={"width": 1440, "height": 900}, reduced_motion="reduce"
        )
        try:
            classes = page.evaluate("() => document.documentElement.className")
            self.assertIn("lenis", classes, msg="classe Lenis absente")

            final, intermediate = self.record_wheel_frames(page)
            self.assertGreater(final, 100, msg="le scroll n'a pas avancé")
            self.assertLessEqual(
                len(intermediate), 1, msg="reduced-motion garde une interpolation"
            )
        finally:
            context.close()

    def test_cart_list_scrolls_without_moving_page(self):
        context, page = self.open_home(viewport={"width": 1440, "height": 900})
        try:
            page.locator("#cart-nav").click()
            page.wait_for_selector(".cart-drawer__list", state="visible")
            page.wait_for_timeout(900)
            page.evaluate(
                """() => {
                  const list = document.querySelector('.cart-drawer__list');
                  const spacer = document.createElement('div');
                  spacer.style.height = '3000px';
                  list.appendChild(spacer);
                  list.scrollTop = 0;
                }"""
            )

            box = page.locator(".cart-drawer__list").bounding_box()
            page.mouse.move(box["x"] + box["width"] / 2, box["y"] + box["height"] / 2)
            page.mouse.wheel(0, 600)
            page.wait_for_timeout(200)

            self.assertGreater(
                page.evaluate("() => document.querySelector('.cart-drawer__list').scrollTop"),
                0,
                msg="la liste du panier ne défile pas",
            )
            self.assertEqual(
                page.evaluate("() => window.scrollY"), 0, msg="la page a défilé avec le panier"
            )

            page.locator("button[aria-label='Close cart']").click()
            page.wait_for_timeout(900)
            page.mouse.move(720, 450)
            page.mouse.wheel(0, 600)
            page.wait_for_function("() => window.scrollY > 100", timeout=3000)
        finally:
            context.close()


if __name__ == "__main__":
    unittest.main(verbosity=2)

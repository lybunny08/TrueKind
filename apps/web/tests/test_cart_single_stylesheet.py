"""Vérifie que les trois écrans du panier partagent un fichier de styles.

Le serveur de dev doit répondre sur http://localhost:3000.
"""

import unittest

from playwright.sync_api import sync_playwright

BASE_URL = "http://localhost:3000"


CART_STYLES_JS = """() => {
  const read = (selector) => {
    const el = document.querySelector(selector);
    return el ? parseFloat(getComputedStyle(el).fontSize) : null;
  };
  const drawer = document.querySelector('.cart-drawer');
  const content = document.querySelector('.cart-drawer-content');
  const cta = document.querySelector('.cart-drawer__footer-checkout');
  const arrow = document.querySelector('.cart-drawer__footer-checkout .btn__icon-arrow');
  const cs = (el, prop) => (el ? parseFloat(getComputedStyle(el)[prop]) : null);
  return {
    title: read('.cart-drawer__header-title'),
    padX: cs(content, 'paddingLeft'),
    cta: read('.cart-drawer__footer-checkout'),
    ctaPadY: cs(cta, 'paddingTop'),
    arrow: cs(arrow, 'width'),
    drawerHasScope: drawer ? drawer.classList.contains('cart-ui') : false,
  };
}"""


class CartSingleStylesheetTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.playwright = sync_playwright().start()
        cls.browser = cls.playwright.chromium.launch(headless=True)

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.playwright.stop()

    def page(self, width):
        return self.browser.new_page(viewport={"width": width, "height": 900})

    def open_drawer(self, width, with_item=False):
        page = self.page(width)
        page.goto(f"{BASE_URL}/products", wait_until="networkidle")
        if with_item:
            page.locator(".product__card-quickcart").first.click()
        page.locator("#cart-nav").click()
        page.wait_for_timeout(1000)
        return page

    def test_drawer_empty_link_is_12px_and_spelled_correctly(self):
        for width in (1440, 375):
            page = self.open_drawer(width)
            try:
                drawer = page.locator(".cart-drawer")
                self.assertIn("cart-ui", drawer.get_attribute("class"), f"scope desktop={width}")
                span = page.locator(".cart-drawer-emptystate .icon-global span")
                self.assertEqual(span.inner_text(), "Browse Products", f"texte desktop={width}")
                font_size = page.evaluate(
                    "() => parseFloat(getComputedStyle(document.querySelector('.cart-drawer-emptystate .icon-global span')).fontSize)"
                )
                self.assertAlmostEqual(font_size, 12, delta=0.1, msg=f"lien tiroir desktop={width}")
            finally:
                page.close()

    def test_cart_page_empty_link_is_12px(self):
        page = self.page(1440)
        try:
            page.goto(f"{BASE_URL}/cart", wait_until="networkidle")
            self.assertIn("cart-ui", page.locator("body div.cart-ui.cart-page").first.get_attribute("class"))
            button = page.get_by_role("button", name="Browse Products")
            self.assertIn("cart-empty-link", button.get_attribute("class"))
            font_size = page.evaluate(
                "() => parseFloat(getComputedStyle([...document.querySelectorAll('button')].find(b => b.textContent.trim() === 'Browse Products')).fontSize)"
            )
            self.assertAlmostEqual(font_size, 12, delta=0.1, msg="lien page panier")
        finally:
            page.close()

    def test_checkout_title_uses_shared_variable(self):
        for width, expected in ((1440, 27), (375, 26.25)):
            page = self.open_drawer(width, with_item=True)
            try:
                page.get_by_role("link", name="Continue to checkout").click()
                page.wait_for_selector("h1.cart-page-title", state="visible")
                self.assertIn(
                    "cart-ui",
                    page.locator("body div.cart-ui.checkout-page").first.get_attribute("class"),
                )
                font_size = page.evaluate(
                    "() => parseFloat(getComputedStyle(document.querySelector('h1.cart-page-title')).fontSize)"
                )
                self.assertAlmostEqual(font_size, expected, delta=0.5, msg=f"titre checkout desktop={width}")
            finally:
                page.close()

    def test_drawer_existing_sizes_are_preserved(self):
        for width in (1440, 375):
            page = self.open_drawer(width, with_item=True)
            try:
                values = page.evaluate(CART_STYLES_JS)
                if width == 1440:
                    self.assertLessEqual(values["title"], 20, msg="titre desktop")
                    self.assertLessEqual(values["padX"], 25, msg="padding desktop")
                    self.assertLessEqual(values["cta"], 8, msg="CTA desktop")
                    self.assertLessEqual(values["ctaPadY"], 10, msg="padding CTA desktop")
                    self.assertLessEqual(values["arrow"], 25, msg="flèche desktop")
                else:
                    self.assertAlmostEqual(values["title"], 33.3333, delta=0.5, msg="titre mobile")
                    self.assertAlmostEqual(values["padX"], 28, delta=0.5, msg="padding mobile")
                    self.assertAlmostEqual(values["cta"], 11.2, delta=0.5, msg="CTA mobile")
                    self.assertAlmostEqual(values["arrow"], 42, delta=0.5, msg="flèche mobile")
                self.assertTrue(values["drawerHasScope"], msg=f"scope desktop={width}")
            finally:
                page.close()

        page = self.page(1440)
        try:
            page.goto(f"{BASE_URL}/products", wait_until="networkidle")
            href = page.locator(".product__card").first.get_attribute("href")
            page.goto(f"{BASE_URL}{href}", wait_until="networkidle")
            font_size = page.evaluate(
                "() => parseFloat(getComputedStyle(document.querySelector('button.btn__icon')).fontSize)"
            )
            self.assertAlmostEqual(font_size, 9.6, delta=0.5, msg="bouton fiche produit")
        finally:
            page.close()


if __name__ == "__main__":
    unittest.main(verbosity=2)

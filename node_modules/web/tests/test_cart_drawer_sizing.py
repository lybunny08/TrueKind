"""Vérifie les tailles calculées du tiroir panier, en desktop et mobile.

Le serveur de dev doit répondre sur http://localhost:3000.
"""

import unittest

from playwright.sync_api import sync_playwright

BASE_URL = "http://localhost:3000"


STYLES_JS = """() => {
  const read = (selector) => {
    const el = document.querySelector(selector);
    if (!el) return null;
    const cs = getComputedStyle(el);
    return {
      fontSize: parseFloat(cs.fontSize),
      paddingLeft: parseFloat(cs.paddingLeft),
      paddingRight: parseFloat(cs.paddingRight),
      paddingTop: parseFloat(cs.paddingTop),
      paddingBottom: parseFloat(cs.paddingBottom),
      width: parseFloat(cs.width),
      height: parseFloat(cs.height),
    };
  };
  return {
    title: read('.cart-drawer__header-title'),
    content: read('.cart-drawer-content'),
    cta: read('.cart-drawer__footer-checkout'),
    arrow: read('.cart-drawer__footer-checkout .btn__icon-arrow'),
  };
}"""


class CartDrawerSizingTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.playwright = sync_playwright().start()
        cls.browser = cls.playwright.chromium.launch(headless=True)

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.playwright.stop()

    def open_cart(self, width):
        page = self.browser.new_page(viewport={"width": width, "height": 900})
        page.goto(f"{BASE_URL}/products", wait_until="networkidle")
        page.locator(".product__card-quickcart").first.click()
        page.locator("#cart-nav").click()
        page.wait_for_selector(".cart-drawer__footer-checkout", state="visible")
        page.wait_for_timeout(1000)
        return page

    def test_desktop_sizes_are_reduced(self):
        page = self.open_cart(1440)
        try:
            styles = page.evaluate(STYLES_JS)
            self.assertLessEqual(styles["title"]["fontSize"], 20, "titre desktop")
            self.assertLessEqual(styles["content"]["paddingLeft"], 25, "padding gauche")
            self.assertLessEqual(styles["content"]["paddingRight"], 25, "padding droite")
            self.assertLessEqual(styles["cta"]["fontSize"], 8, "texte du CTA")
            self.assertLessEqual(styles["cta"]["paddingTop"], 10, "padding haut du CTA")
            self.assertLessEqual(styles["cta"]["paddingBottom"], 10, "padding bas du CTA")
            self.assertLessEqual(styles["arrow"]["width"], 25, "largeur de la flèche")
            self.assertLessEqual(styles["arrow"]["height"], 25, "hauteur de la flèche")
        finally:
            page.close()

    def test_mobile_sizes_are_unchanged(self):
        page = self.open_cart(375)
        try:
            styles = page.evaluate(STYLES_JS)
            self.assertAlmostEqual(styles["title"]["fontSize"], 33.3333, delta=0.5, msg="titre mobile")
            self.assertAlmostEqual(styles["content"]["paddingLeft"], 28, delta=0.5, msg="padding gauche mobile")
            self.assertAlmostEqual(styles["cta"]["fontSize"], 11.2, delta=0.5, msg="texte CTA mobile")
            self.assertAlmostEqual(styles["cta"]["paddingTop"], 21, delta=0.5, msg="padding haut CTA mobile")
            self.assertAlmostEqual(styles["arrow"]["width"], 42, delta=0.5, msg="flèche mobile")
        finally:
            page.close()

    def test_product_detail_button_is_unchanged(self):
        page = self.browser.new_page(viewport={"width": 1440, "height": 900})
        try:
            page.goto(f"{BASE_URL}/products", wait_until="networkidle")
            page.goto(f"{BASE_URL}/products/{page.locator('.product__card').first.get_attribute('href').split('/')[-1]}", wait_until="networkidle")
            font_size = page.evaluate(
                "() => parseFloat(getComputedStyle(document.querySelector('button.btn__icon')).fontSize)"
            )
            self.assertAlmostEqual(font_size, 9.6, delta=0.5, msg="bouton fiche produit")
        finally:
            page.close()


if __name__ == "__main__":
    unittest.main(verbosity=2)

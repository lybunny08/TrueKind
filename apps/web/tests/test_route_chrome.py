"""Vérifie que le chrome boutique est réservé aux pages publiques.

Le serveur de dev doit répondre sur http://localhost:3000.
"""

import unittest

from playwright.sync_api import sync_playwright

BASE_URL = "http://localhost:3000"

STOREFRONT_PATHS = ["/", "/products", "/cart", "/checkout/success"]
APP_PATHS = ["/login", "/signup"]


class RouteChromeTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.playwright = sync_playwright().start()
        cls.browser = cls.playwright.chromium.launch(headless=True)

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.playwright.stop()

    def test_storefront_has_header_footer_cart_button(self):
        for path in STOREFRONT_PATHS:
            page = self.browser.new_page()
            try:
                page.goto(f"{BASE_URL}{path}", wait_until="networkidle")
                self.assertEqual(page.locator("#header").count(), 1, msg=f"header {path}")
                self.assertEqual(page.locator("#footer").count(), 1, msg=f"footer {path}")
                self.assertEqual(page.locator("#cart-nav").count(), 1, msg=f"cart-nav {path}")
            finally:
                page.close()

    def test_app_pages_have_no_storefront_chrome(self):
        for path in APP_PATHS:
            page = self.browser.new_page()
            try:
                page.goto(f"{BASE_URL}{path}", wait_until="networkidle")
                self.assertEqual(page.locator("#header").count(), 0, msg=f"header {path}")
                self.assertEqual(page.locator("#footer").count(), 0, msg=f"footer {path}")
            finally:
                page.close()

    def test_account_has_no_storefront_chrome(self):
        page = self.browser.new_page()
        try:
            page.add_init_script(
                "localStorage.setItem('token','test-token');"
                "localStorage.setItem('user', JSON.stringify({id:'1',email:'a@b.c',name:'Test',role:'user'}));"
            )
            page.goto(f"{BASE_URL}/account", wait_until="networkidle")
            page.wait_for_selector("text=My Account", state="visible")
            self.assertEqual(page.locator("#header").count(), 0, msg="header account")
            self.assertEqual(page.locator("#footer").count(), 0, msg="footer account")
        finally:
            page.close()


if __name__ == "__main__":
    unittest.main(verbosity=2)

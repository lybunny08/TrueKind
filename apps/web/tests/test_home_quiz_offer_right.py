"""Vérifie que l'offre de #quiz est regroupée et placée sur la photo en desktop.

Le serveur de dev doit répondre sur http://localhost:3000.
"""

import unittest

from playwright.sync_api import sync_playwright

BASE_URL = "http://localhost:3000"


QUIZ_JS = """() => {
  const section = document.querySelector('#quiz');
  const grid = section && section.querySelector('.half__grid');
  const copy = section && section.querySelector('.offer__copy');
  const text = section && section.querySelector('.offer__text');
  const cta = section && section.querySelector('.offer__cta');
  const link = section && section.querySelector('a.offer__more');
  const x = (el) => (el ? Math.round(el.getBoundingClientRect().x * 10) / 10 : null);
  const txt = (el) => (el ? el.innerText.replace(/\\s+/g, ' ').trim() : null);
  return {
    gridWidth: grid ? grid.getBoundingClientRect().width : null,
    copyExists: !!copy,
    copyPosition: copy ? getComputedStyle(copy).position : null,
    copyX: x(copy),
    copyContainsText: !!(copy && text && copy.contains(text)),
    copyContainsCta: !!(copy && cta && copy.contains(cta)),
    textX: x(text),
    ctaX: x(cta),
    ctaRight: cta ? x(cta) + cta.getBoundingClientRect().width : null,
    ctaHref: link ? link.getAttribute('href') : null,
    titleText: txt(text && text.querySelector('.title')),
    descriptionText: txt(text && text.querySelector('.description')),
    ctaText: txt(link),
  };
}"""


class HomeQuizOfferRightTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.playwright = sync_playwright().start()
        cls.browser = cls.playwright.chromium.launch(headless=True)

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.playwright.stop()

    def data(self, width):
        page = self.browser.new_page(viewport={"width": width, "height": 900})
        try:
            page.goto(BASE_URL, wait_until="networkidle")
            return page.evaluate(QUIZ_JS)
        finally:
            page.close()

    def test_offer_copy_is_on_the_right_on_desktop(self):
        data = self.data(1440)

        self.assertTrue(data["copyExists"], msg="wrapper .offer__copy")
        self.assertEqual(data["copyPosition"], "absolute", msg="position desktop")
        self.assertIsNotNone(data["gridWidth"], msg="largeur grille")
        self.assertIsNotNone(data["copyX"], msg="position x du wrapper")
        self.assertGreaterEqual(data["copyX"], data["gridWidth"] / 2, msg="wrapper à droite")
        self.assertGreaterEqual(data["textX"], data["gridWidth"] / 2, msg="texte à droite")
        self.assertGreaterEqual(data["ctaX"], data["gridWidth"] / 2, msg="CTA à droite")
        self.assertTrue(data["copyContainsText"], msg="texte dans le wrapper")
        self.assertTrue(data["copyContainsCta"], msg="CTA dans le wrapper")

    def test_offer_content_and_link_are_unchanged(self):
        for width in (1440, 375):
            data = self.data(width)

            self.assertIn(
                "exciting offers awaits", data["titleText"].casefold(), msg=f"titre #{width}"
            )
            self.assertIn(
                "Shop now to get a chance to win 2 extra products.",
                data["descriptionText"],
                msg=f"description #{width}",
            )
            self.assertEqual(data["ctaText"], "Shop Now", msg=f"CTA #{width}")
            self.assertEqual(data["ctaHref"], "/products", msg=f"lien #{width}")

    def test_cta_is_near_the_right_edge_on_large_screens(self):
        for width in (1440, 1600):
            data = self.data(width)

            self.assertIsNotNone(data["ctaRight"], msg=f"bord droit CTA #{width}")
            self.assertGreaterEqual(
                data["ctaRight"], data["gridWidth"] - 120, msg=f"CTA près du bord droit #{width}"
            )

    def test_mobile_layout_is_unchanged(self):
        data = self.data(375)

        self.assertEqual(data["copyPosition"], "static", msg="wrapper statique sur mobile")
        self.assertAlmostEqual(data["textX"], 22.4, delta=3, msg="texte mobile")
        self.assertAlmostEqual(data["ctaX"], 285.4, delta=3, msg="CTA mobile")


if __name__ == "__main__":
    unittest.main(verbosity=2)

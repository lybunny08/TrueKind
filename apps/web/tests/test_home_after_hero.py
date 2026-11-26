"""Vérifie le haut « Clean, Concise, Conscious » de la home, le reste inchangé.

Le serveur de dev doit répondre sur http://localhost:3000.
"""

import unittest

from playwright.sync_api import sync_playwright

BASE_URL = "http://localhost:3000"


HOME_JS = """() => {
  const section = document.querySelector('#ingredients');
  const text = section && section.querySelector('.cc__top');
  const title = section && section.querySelector('.cc__title');
  const serif = section && section.querySelector('.cc__serif');
  const tag = section && section.querySelector('.cc__tag');
  const cs = (el, prop) => (el ? parseFloat(getComputedStyle(el)[prop]) : null);
  const txt = (el) => (el ? el.innerText.replace(/\\s+/g, ' ').trim() : null);
  const src = (el) => {
    const value = el && el.getAttribute('src');
    return value ? decodeURIComponent(value) : null;
  };
  const items = section ? [...section.querySelectorAll('.ingredients__item')] : [];
  return {
    titleText: txt(title),
    serifText: txt(serif),
    tagText: txt(tag),
    titleFont: cs(title, 'fontSize'),
    serifFont: cs(serif, 'fontSize'),
    tagFont: cs(tag, 'fontSize'),
    serifStyle: serif ? getComputedStyle(serif).fontStyle : null,
    serifTransform: serif ? getComputedStyle(serif).textTransform : null,
    textWidth: cs(text, 'width'),
    tagWidth: cs(tag, 'width'),
    hasArrow: !!section && !!section.querySelector('.ingredients__arrow'),
    itemCount: items.length,
    itemTitles: items.map((item) => {
      const h3 = item.querySelector('h3');
      return h3 ? h3.textContent.trim() : null;
    }),
    mainImageSrc: src(section && section.querySelector('.ingredients__image')),
    leafSrc: src(section && section.querySelector('.ingredients__image-1 img')),
    empressSrc: src(section && section.querySelector('.ingredients__image-2 img')),
    hasOldRows: !!section && !!section.querySelector('.ingredients__firstrow')
      && !!section.querySelector('.ingredients__secondrow'),
    hasNewScene: !!section && !!section.querySelector('.cc__stage, .cc__blob, .cc__card'),
  };
}"""


class HomeAfterHeroTest(unittest.TestCase):
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

    def test_top_visual_and_previous_section_restored(self):
        for width in (1440, 375):
            page = self.page(width)
            try:
                page.goto(BASE_URL, wait_until="networkidle")
                data = page.evaluate(HOME_JS)

                self.assertEqual(
                    data["titleText"], "CLEAN, CONCISE, CONSCIOUSskincare.", msg=f"titre #{width}"
                )
                self.assertEqual(data["serifText"], "skincare.", msg=f"serif #{width}")
                self.assertEqual(data["serifStyle"], "italic", msg=f"italique serif #{width}")
                self.assertEqual(data["serifTransform"], "none", msg=f"casse serif #{width}")
                self.assertIn("Unreservedly honest products", data["tagText"], msg=f"tagline #{width}")

                text_width = data["textWidth"]
                self.assertIsNotNone(text_width, msg=f"largeur texte #{width}")
                self.assertAlmostEqual(
                    data["titleFont"], 0.064 * text_width, delta=0.5, msg=f"titre px #{width}"
                )
                self.assertAlmostEqual(
                    data["serifFont"], 1.375 * data["titleFont"], delta=0.5, msg=f"serif px #{width}"
                )
                self.assertAlmostEqual(
                    data["tagFont"], max(7, 0.0145 * text_width), delta=0.5, msg=f"tagline px #{width}"
                )
                self.assertAlmostEqual(
                    data["tagWidth"], 0.34 * text_width, delta=1, msg=f"largeur tagline #{width}"
                )

                self.assertTrue(data["hasArrow"], msg=f"flèche #{width}")
                self.assertFalse(data["hasNewScene"], msg=f"ancienne scène absente #{width}")
                self.assertTrue(data["hasOldRows"], msg=f"rangées d'origine #{width}")
                self.assertEqual(data["itemCount"], 4, msg=f"cartes d'origine #{width}")
                self.assertEqual(
                    data["itemTitles"],
                    [
                        "Clean, Beyond Reproach",
                        "Radical Transparency",
                        "Potent & Multi Tasking",
                        "Conscious & Responsible",
                    ],
                    msg=f"titres cartes d'origine #{width}",
                )
                self.assertIn("ingredients-clip.jpg", data["mainImageSrc"], msg=f"image principale #{width}")
                self.assertIn("leaf.png", data["leafSrc"], msg=f"feuille #{width}")
                self.assertIn("empress.png", data["empressSrc"], msg=f"empress #{width}")
            finally:
                page.close()

    def test_product_detail_button_is_unchanged(self):
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

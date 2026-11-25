from playwright.sync_api import sync_playwright

JS = """() => {
  const pick = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = getComputedStyle(el);
    return {
      fontSize: cs.fontSize,
      paddingLeft: cs.paddingLeft,
      paddingRight: cs.paddingRight,
      paddingTop: cs.paddingTop,
      paddingBottom: cs.paddingBottom,
      width: cs.width,
      height: cs.height,
      visibility: cs.visibility,
    };
  };
  return {
    title: pick('.cart-drawer__header-title'),
    content: pick('.cart-drawer-content'),
    cta: pick('.cart-drawer__footer-checkout'),
    arrow: pick('.cart-drawer__footer-checkout .btn__icon-arrow'),
    rootFontSize: getComputedStyle(document.documentElement).fontSize,
  };
}"""

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    for width in (1440, 375):
        page = browser.new_page(viewport={"width": width, "height": 900})
        page.goto("http://localhost:3000/products", wait_until="networkidle")
        page.locator(".product__card-quickcart").first.click()
        page.locator("#cart-nav").click()
        page.wait_for_timeout(1000)
        print(width, page.evaluate(JS))
        page.close()
    browser.close()

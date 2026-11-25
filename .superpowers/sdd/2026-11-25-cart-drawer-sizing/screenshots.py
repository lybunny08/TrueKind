from playwright.sync_api import sync_playwright

OUT = r"D:\Projetcs\TrueKind\.superpowers\sdd\2026-11-25-cart-drawer-sizing"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    for name, width in (("desktop", 1440), ("mobile", 375)):
        page = browser.new_page(viewport={"width": width, "height": 900})
        page.goto("http://localhost:3000/products", wait_until="networkidle")
        page.locator(".product__card-quickcart").first.click()
        page.locator("#cart-nav").click()
        page.wait_for_timeout(1200)
        page.screenshot(path=f"{OUT}\cart-{name}.png")
        page.close()

    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto("http://localhost:3000/products", wait_until="networkidle")
    href = page.locator(".product__card").first.get_attribute("href")
    page.goto(f"http://localhost:3000{href}", wait_until="networkidle")
    page.screenshot(path=f"{OUT}\product-detail.png")
    page.close()
    browser.close()

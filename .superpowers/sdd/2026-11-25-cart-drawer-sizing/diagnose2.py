from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto("http://localhost:3000/", wait_until="networkidle")
    page.locator("#cart-nav").click()
    page.wait_for_timeout(1200)
    print(page.evaluate("""() => {
      const span = document.querySelector('.cart-drawer-emptystate .icon-global span');
      const link = span.parentElement;
      const parent = link.parentElement;
      return {
        spanClass: span.className,
        spanText: span.textContent,
        spanFontSize: getComputedStyle(span).fontSize,
        linkClass: link.className,
        linkFontSize: getComputedStyle(link).fontSize,
        parentFontSize: getComputedStyle(parent).fontSize,
        bodyText: document.body.innerText.includes('BrowseProducts'),
      };
    }"""))
    browser.close()

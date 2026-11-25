from playwright.sync_api import sync_playwright

JS = """() => {
  const els = [...document.querySelectorAll('a, button, span')].filter(
    (el) => el.textContent.trim() === 'Browse Products' && el.children.length === 0
  );
  return els.map((el) => {
    const chain = [];
    let cur = el;
    while (cur && chain.length < 4) {
      const cs = getComputedStyle(cur);
      chain.push({
        tag: cur.tagName,
        cls: cur.className,
        fontSize: cs.fontSize,
        color: cs.color,
      });
      cur = cur.parentElement;
    }
    return chain;
  });
}"""

INJECT_JS = """() => {
  const span = document.querySelector('.cart-drawer-emptystate .icon-global span');
  const link = document.querySelector('.cart-drawer-emptystate .icon-global');
  const before = getComputedStyle(span).fontSize;
  link.classList.add('text-[12px]');
  const afterLink = getComputedStyle(span).fontSize;
  link.classList.remove('text-[12px]');
  span.classList.add('text-[12px]');
  const afterSpan = getComputedStyle(span).fontSize;
  span.classList.remove('text-[12px]');
  return { before, afterLink, afterSpan, root: getComputedStyle(document.documentElement).fontSize };
}"""

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto("http://localhost:3000/", wait_until="networkidle")
    page.locator("#cart-nav").click()
    page.wait_for_timeout(1000)
    print("DRAWER:", page.evaluate(JS))
    print("INJECT:", page.evaluate(INJECT_JS))
    page.goto("http://localhost:3000/cart", wait_until="networkidle")
    print("CART PAGE:", page.evaluate(JS))
    browser.close()

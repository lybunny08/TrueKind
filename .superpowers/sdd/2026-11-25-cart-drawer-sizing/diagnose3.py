import json
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto("http://localhost:3000/", wait_until="networkidle")
    page.locator("#cart-nav").click()
    page.wait_for_timeout(1200)
    cdp = page.context.new_cdp_session(page)
    cdp.send("DOM.enable")
    cdp.send("CSS.enable")
    doc = cdp.send("DOM.getDocument")
    node = cdp.send("DOM.querySelector", {"nodeId": doc["root"]["nodeId"], "selector": ".cart-drawer-emptystate .icon-global span"})
    matched = cdp.send("CSS.getMatchedStylesForNode", {"nodeId": node["nodeId"]})
    for rule in matched.get("matchedCSSRules", []):
        sel = rule["rule"]["selectorList"]["text"]
        props = [p for p in rule["rule"]["style"]["cssProperties"] if p["name"] in ("font-size", "font", "all")]
        if props:
            print(sel, [(p["name"], p["value"], p.get("important")) for p in props], rule["rule"]["origin"], rule.get("layer"))
    print("INLINE", matched.get("inlineStyle", {}).get("cssProperties"))
    browser.close()

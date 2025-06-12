import asyncio
from playwright.async_api import async_playwright


async def capture_website(url, output_path):
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.goto(url, wait_until="networkidle")
        await page.screenshot(path=output_path, full_page=True)
        await browser.close()


def main():
    url = "https://jpcgw.monthrev.com/private?package_name=com.jpcgw.yf&version_name=1.0.0.0&channel_name=&device_id=test13ei1klqtno&fd=1&debug=true"
    output_path = "screenshot.png"
    asyncio.run(capture_website(url, output_path))
    print(f"Screenshot saved to {output_path}")


if __name__ == "__main__":
    main()

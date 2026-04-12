import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        # Record video just in case we need it to debug
        context = await browser.new_context(
            viewport={'width': 1280, 'height': 800},
            record_video_dir="videos/"
        )
        page = await context.new_page()

        # Go to app
        await page.goto("http://localhost:5173")

        # Click Generator button in header
        print("Clicking Generator button...")
        await page.click("button:has-text('Generator 🚀')")

        # Wait for the textarea and the required indicator
        print("Waiting for textarea...")
        await page.wait_for_selector("textarea#app-prompt", state="visible", timeout=10000)

        # Type into the textarea to show the character count updates
        print("Typing into textarea...")
        await page.fill("textarea#app-prompt", "This is an app for deaf designers.")

        # Wait for the character count to update
        await page.wait_for_selector("text='34/500'")

        # Take screenshot
        print("Taking screenshot...")
        await page.screenshot(path="frontend_screenshot.png")

        await context.close()
        await browser.close()

asyncio.run(main())

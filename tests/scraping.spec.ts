import { test, expect, chromium } from "@playwright/test";
// import * as path from "path";

test.use({
  screenshot: "only-on-failure",
  context: async ({}, use) => {
    // const pathToExtension = path.join(__dirname, "../dist/extensions");
    const userDataDir = "/tmp/test-user-data-dir";
    const context = await chromium.launchPersistentContext(userDataDir, {
      channel: "chrome",
      headless: false,
      ignoreDefaultArgs: ["--disable-extensions"],
      args: [
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--disable-setuid-sandbox",
        "--no-sandbox",
        // `--disable-extensions-except=${pathToExtension}`,
        // `--load-extension=${pathToExtension}`,
      ],
      permissions: ["clipboard-read"],
    });
    await use(context);
  },
  page: async ({ context }, use) => {
    const page = context.pages()[0];
    page.on("pageerror", (err) => {
      console.error(err.message);
    });
    page.on("console", (message) => {
      if (message.type() === "error") console.error(message);
    });
    page.on("requestfailed", (request) => {
      console.error(
        `${request.method()} ${request.url()}: ${request.failure()?.errorText}`
      );
    });
    await use(page);
  },
});

test.setTimeout(120_000);

test("scraping a page", async ({ page, browser }) => {
  await page.goto("https://yahoo.co.jp");
  await page
    .getByRole("heading", { name: "Yahoo! JAPAN" })
    .getByRole("link", { name: "Yahoo! JAPAN" })
    .isVisible();
  await page.getByRole("link", { name: "画像で検索" }).click();
  await page.getByRole("searchbox").fill("cat");
  await page.getByRole("button", { name: "検索" }).click();
  await browser.close();
});

import { test, expect, chromium } from "@playwright/test";
// import * as path from "path";
import fs from "fs";

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

test.setTimeout(30_000);

test("scraping a page", async ({ page, browser }) => {
  await page.goto("https://scrapeme.live/shop/");
  const product = await page.$$eval("li.product", (all_items) => {});
  console.log({ product });
  await page
    .getByRole("img")
    .first()
    .screenshot({ path: "./test-results/screenshots/" });
  await page.pause();
  // const [download] = await Promise.all([
  //   page.waitForEvent("download"),
  //   page.getByRole("figure").first().locator("a").click(),
  // ]);
  // const suggestedFileName = download.suggestedFilename();
  // const filePath = "download/" + suggestedFileName;
  // await download.saveAs(filePath);
  // expect(fs.existsSync(filePath)).toBeTruthy();
  // await page
  //   .locator("#isr section")
  //   .getByRole("img", { name: "猫の日 - Wikipedia" })
  //   .screenshot({ path: "./test-results/screenshots/cat.png" });
  await browser.close();
});

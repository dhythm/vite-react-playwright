import { test, expect } from "@playwright/test";

// 各テストを実行する前に http://localhost:3000 に遷移する
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173");
});

test("mainpage has counter button and counting up when button is clicked", async ({
  page,
}) => {
  // Expect the counter shows 0
  await expect(page.locator("text=count is 0")).toBeVisible();
  // Click the count-up button
  await page.locator("button").click();
  // Expect the counter shows 1
  await expect(page.locator("text=count is 1")).toBeVisible();
  // Click the count-up button
  await page.locator("button").click();
  // Expect the counter shows 2
  await expect(page.locator("text=count is 2")).toBeVisible();
});

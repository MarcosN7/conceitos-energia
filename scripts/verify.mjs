import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";

const base = process.env.BASE_URL || "http://127.0.0.1:5173";
await mkdir("artifacts", { recursive: true });
const browser = await chromium.launch({ headless: true });
const report = [];
const errors = [];
const context = await browser.newContext({ reducedMotion: "reduce" });
const page = await context.newPage();
page.on("pageerror", (error) => errors.push(error.message));
page.on("console", (message) => {
  if (message.type() === "error") errors.push(message.text());
});
page.on("response", (response) => {
  if (response.status() >= 400)
    errors.push(`${response.status()} ${response.url()}`);
});

try {
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: width > 1000 ? 1000 : 844 });
    for (const route of ["/", "/industrial", "/regional", "/portfolio"]) {
      await page.goto(base + route, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator("h1").count(), 1, `h1 ${route}`);
      assert.equal(await page.locator("vite-error-overlay").count(), 0);
      const dimensions = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        client: document.documentElement.clientWidth,
      }));
      assert.ok(
        dimensions.scroll <= dimensions.client,
        `Overflow ${route} ${width}: ${JSON.stringify(dimensions)}`,
      );
      await page.evaluate(async () => {
        await Promise.all(
          Array.from(document.images).map((image) =>
            image.decode().catch(() => {}),
          ),
        );
      });
      const photoUrls = await page
        .locator("svg image")
        .evaluateAll((images) => [
          ...new Set(images.map((image) => image.getAttribute("href"))),
        ]);
      for (const url of photoUrls)
        assert.ok(
          (await context.request.get(base + url)).ok(),
          `Missing image ${url}`,
        );
      assert.ok(photoUrls.length > 0, `No photography on ${route}`);
      const broken = await page
        .locator('a[href^="#"]')
        .evaluateAll((links) =>
          links
            .filter((link) => !document.getElementById(link.hash.slice(1)))
            .map((link) => link.href),
        );
      assert.deepEqual(broken, [], `Broken anchors ${route}`);
      if (width === 1440 || width === 390)
        await page.screenshot({
          path: `artifacts/${route.slice(1) || "galeria"}-${width}.jpg`,
          fullPage: true,
          type: "jpeg",
          quality: 75,
        });
      if (route !== "/") {
        if (width < 761) {
          const menu = page.getByRole("button", { name: "Menu", exact: true });
          await menu.click();
          assert.equal(
            await page
              .getByRole("button", { name: "Fechar", exact: true })
              .getAttribute("aria-expanded"),
            "true",
          );
          await page.keyboard.press("Escape");
          assert.equal(await menu.getAttribute("aria-expanded"), "false");
          await menu.click();
          await page
            .getByRole("navigation")
            .getByRole("link", { name: "Contato", exact: true })
            .click();
          assert.equal(await menu.getAttribute("aria-expanded"), "false");
        } else {
          await page
            .getByRole("navigation")
            .getByRole("link", { name: "Contato", exact: true })
            .click();
        }
        assert.equal(new URL(page.url()).hash, "#contato");
        await page.locator(".contact-toggle").click();
        assert.ok(await page.locator("#contact-details").isVisible());
        await page
          .getByRole("button", { name: "Validar demonstração" })
          .click();
        assert.equal(
          await page.locator("form").evaluate((form) => form.checkValidity()),
          false,
        );
        await page.getByLabel("Nome", { exact: true }).fill("Teste local");
        await page
          .getByLabel("E-mail", { exact: true })
          .fill("teste@example.com");
        await page.getByLabel("Empresa", { exact: true }).fill("Demonstração");
        await page
          .getByLabel("Sobre o projeto")
          .fill("Verificação local da demonstração.");
        const sent = [];
        const track = (request) => {
          if (request.method() !== "GET") sent.push(request.url());
        };
        page.on("request", track);
        await page
          .getByRole("button", { name: "Validar demonstração" })
          .click();
        assert.match(
          await page.locator(".form-status").innerText(),
          /não enviou nem armazenou/,
        );
        assert.deepEqual(sent, [], "Demo must not send data");
        page.off("request", track);
        if (route === "/regional") {
          await page.locator("summary").first().click();
          assert.ok(
            (await page.locator("details").first().getAttribute("open")) !==
              null,
          );
        }
        if (route === "/portfolio") {
          for (const [filter, count] of [
            ["Fotovoltaica", 1],
            ["Geração a diesel", 1],
            ["Infraestrutura", 2],
            ["Todas", 4],
          ]) {
            await page
              .getByRole("button", { name: filter, exact: true })
              .click();
            assert.equal(await page.locator(".gallery-item").count(), count);
            assert.equal(
              await page
                .getByRole("button", { name: filter, exact: true })
                .getAttribute("aria-pressed"),
              "true",
            );
          }
        }
        await page.reload({ waitUntil: "networkidle" });
        assert.equal(await page.locator("h1").count(), 1);
        await page.getByRole("link", { name: "Ver outros conceitos" }).click();
        assert.equal(new URL(page.url()).pathname, "/");
      } else {
        assert.equal(await page.locator(".concept-choice").count(), 3);
        await page.locator(".concept-choice").first().click();
        assert.equal(new URL(page.url()).pathname, "/industrial");
      }
      report.push({ route, width, result: "PASS" });
    }
  }
  await page.goto(base + "/pagina-inexistente");
  assert.match(await page.locator("main").innerText(), /404/);
  assert.deepEqual(errors, [], "Browser errors");
  await writeFile(
    "artifacts/verification.json",
    JSON.stringify(
      { base, timestamp: new Date().toISOString(), report, errors },
      null,
      2,
    ),
  );
  console.log(
    JSON.stringify({ result: "PASS", views: report.length, errors }, null, 2),
  );
} finally {
  await browser.close();
}

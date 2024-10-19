# playwright-canvas

Proof-of-concept demonstrating HTML Canvas scenarios testing via Playwright.

## About

The key idea is to leverage Playwright's [Clock API](https://playwright.dev/docs/clock) API along with the [Visual comparisons](https://playwright.dev/docs/test-snapshots) abilities. This allows end-to-end testing for various HTML Canvas scenarios such as gameplay loops, 3D scenes, fragment shaders outputs, etc.

## Getting started

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

Then, clone this repo, open a terminal in its parent directory and install dependencies:

```sh
npm i
```

Build the app example:

```sh
npm run build
```

Install Playwright's browsers:

```sh
npx playwright install
```

Run the test:

```sh
npx playwright test
```

> [!WARNING]  
> This test example was made on macOS (Darwin), which means that the example tests from this repo will fail for other operating systems due to some low-level rendering differences between them. If you have to do a consistent cross-platform visual regression testing with Playwright, consider using [Docker](https://playwright.dev/docs/docker).

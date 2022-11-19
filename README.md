# vite-react-playwright

## How to create the environment

```sh
npm create vite@latest
✔ Project name: … vite-react-playwright
✔ Select a framework: › React
✔ Select a variant: › TypeScript

cd vite-react-playwright

npm init playwright@latest
✔ Where to put your end-to-end tests? · tests
✔ Add a GitHub Actions workflow? (y/N) · false
```

## Additional settings (Component testing)

```sh
npm init playwright@latest -- --ct
npm run test-ct
```

## Getting Started

```sh
npm install

npx playwright test
npx playwright test landing-page.spec.ts
npx playwright test landing-page.spec.ts --headed
npx playwright test tests/todo-page/ tests/landing-page/
npx playwright test -g "add a todo item"
```

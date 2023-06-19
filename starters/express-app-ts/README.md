# Basic Node.js Starter Project (TypeScript)

This is a starter for a [Node.js](https://nodejs.org) project that provides a very lightweight, minimal configuration. This is great if you want to start any Node.js project from the ground-up as there are no dependencies.

If you want to use Express, you may want to look at the [express-app-ts](../express-app-ts) starter project instead.

Note that this uses TypeScript. If you want the JavaScript equivalent to this, use the [basic-nodejs](../basic-nodejs) project instead.

## Getting Started

### Standard Method

The only prerequisite is that you must have [Node.js](https://nodejs.org) installed. This was tested on Node.js v18.16.0, but many other Node.js versions should still work.

Once Node.js is installed, install the project dependencies with the following command:

```
npm install
```

Finally, you can start the development server with following command:

```
npm run dev
```

### Docker Development Environment

Alternatively, you can also run the Docker development environment which only requires an installation of [Docker](https://www.docker.com). This was tested on Docker Desktop 4.20.0, but many other Docker installations should work.

Then all you need to do is run the following command to start the development server:

```
docker compose up
```

## Technology Overview

-   [Babel](https://babeljs.io): Compiler used with webpack to support TypeScript and ECMAScript modules with Jest.
-   [Docker](https://www.docker.com): Used for an optional development environment. This can be handy if you want more consistency across different machines with minimal setup.
-   [ESLint](https://eslint.org): Linter to quickly find code problems.
-   [Git](https://git-scm.com): Version control system to track code changes.
-   [Husky](https://typicode.github.io/husky) & [lint-staged](https://github.com/okonet/lint-staged): Pre-commit hooks to enforce code style and identify problems.
-   [Jest](https://jestjs.io): Testing framework to ensure code correctness and coverage.
-   [Prettier](https://prettier.io): Formatter to enforce code style.
-   [webpack](https://webpack.js.org): Bundler used to build the app.

## Learn More

To get a more in-depth idea about what building off of this starter project is like, please read the [Developer Experience Walkthrough](./dx-walkthrough.md).
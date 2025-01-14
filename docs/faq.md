# Frequently Asked Questions (FAQ)

This document goes over frequently asked questions that don't really fit anywhere else in the docs. If you don't find your specific question here, try looking at other FAQ or troubleshooting sections in specific documents relevant to your question.

## Questions

- [How do I remove all mentions of Lean JS App Starter from my project?](#how-do-i-remove-all-mentions-of-lean-js-app-starter-from-my-project)
- [How do you change Node.js versions?](#how-do-you-change-nodejs-versions)
- [Why is JSX only allowed in files with `.jsx` extensions?](#why-is-jsx-only-allowed-in-files-with-jsx-extensions)
- [Why use Babel over the official TypeScript compiler?](#why-use-babel-over-the-official-typescript-compiler)
- [Why are ECMAScript modules used for Node.js projects over CommonJS modules?](#why-are-ecmascript-modules-used-for-nodejs-projects-over-commonjs-modules)
- [Why do you still use webpack for Node.js projects?](#why-do-you-still-use-webpack-for-nodejs-projects)

---

#### How do I remove all mentions of Lean JS App Starter from my application?

Search the code for strings that are the starter project code name prefixed with `ljas-`. This will be the same value as the `name` field in `package.json`. There are not many of them to replace.

For example, if you're using the [React + Browser starter](../starters/react-browser), you would search and replace for `ljas-react-browser`. This would replace the `package.json` `name` field and the title option in the webpack configuration used as the contents of the `<title>` tag in the HTML template.

---

#### How do you change Node.js versions?

We currently support Node.js versions >=20.9 to <21 by default. If you want to change that, you need to update the `engines.node` field in `package.json` and the Node.js version in the `.browserslistrc` file.

If you're using the Docker development environment, you will also need to update the Dockerfiles' `FROM` instructions to a base image with the updated Node.js version. You can find an appropriate official Node.js image on Docker Hub: https://hub.docker.com/_/node/tags

Don't forget to make sure everything is still working as expected after changing versions.

---

#### Why is JSX only allowed in files with `.jsx` extensions?

This is to remain consistent with the TypeScript projects where the language requires JSX to be in files with `.tsx` extensions.

---

#### Why use Babel over the official TypeScript compiler?

We use Babel to compile TypeScript because we already use it to handle syntax transforms, browser polyfills, and React. This also helps to improve performance for the build process as type checking gets moved into a separate process using [Fork TS Checker Webpack Plugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin).

---

#### Why are ECMAScript modules used for Node.js projects over CommonJS modules?

Because ECMAScript modules are used for the frontend projects, we've decided to maintain consistency and use them for the Node.js projects as well. One exception to this is for some configuration code where CommonJS modules are used by default.

---

#### Why do you still use webpack for Node.js projects?

We do this to maintain consistency with all of the other projects, mainly for the Node.js projects using TypeScript, and we're avoiding some quirks Node.js has with ECMAScript modules and imports.

Although Node.js does have very good support for modern ECMAScript standards, some of the developer experience slightly varies from the standard experience offered by codebases that utilize TypeScript or webpack. For example, [Node.js requires file extensions in `import` declarations because of its stricter implementation of the ECMAScript 2015 specification](https://nodejs.org/api/esm.html#mandatory-file-extensions), whereas TypeScript and webpack have opted to handle imports with a more lenient approach that guesses file extensions similarly to CommonJS `require` function calls. Without webpack, we could rely on the `experimental-specifier-resolution` flag, but [Node.js recommends against this since it is planned to be removed](https://nodejs.org/dist/latest-v18.x/docs/api/esm.html#customizing-esm-specifier-resolution-algorithm).

There are a few other quirks that come along with ECMAScript modules and Node.js too. For example, in order to use them you must utilize them in `.mjs` files or
set the `type` field in `package.json` to `"module"` which introduces its own complications around configuration and the developer experience. Using webpack allows us to avoid all of these issues while introducing some useful tools that Node.js lacks out-of-the-box.

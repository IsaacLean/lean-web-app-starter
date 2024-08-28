# Building

## Contents

-   [Overview](#overview)
-   [webpack Build Scripts](#webpack-build-scripts)
-   [Build Targets](#build-targets)
-   [Building Distributable Applications for Electron](#building-distributable-applications-for-electron)
-   [Building Icons for Electron Applications](#building-icons-for-electron-applications)
-   [Troubleshooting](#troubleshooting)

## Overview

[webpack](https://webpack.js.org) is the core of the build process for all LJAS projects. When you run a `build` `package.json` script, it will start a webpack process which pull along other tools it needs as it progresses. When the build process is complete, it will produce the build files in the `build/` directory.

When working with Electron-based projects, an additional step must be done to produce the distributable apps. This is gone over in the ["Building Distributable Applications for Electron" section](#building-distributable-applications-for-electron).

## webpack Build Scripts

There are several different build-related commands offered as `package.json` scripts that vary depending on which starter you're building off of, but two scripts that all projects have are:

-   `npm run build`  
    Create a development build in the `build/development/` directory. This process is automatically run for you in the `npm run dev` script.
-   `npm run build:production`  
    A variant of the `build` script that creates a production build in the `build/production/` directory. This is the build you should deploy to production.

In addition to this, different starters will have other variant scripts available to you like:

-   `npm run build:debug`  
    Debug the webpack build process for development builds. Learn more about debugging webpack in the ["webpack build process with Google Chrome" section in the debugging document](../developing/debugging.md#webpack-build-process-with-google-chrome).
-   `npm run build:stats`  
    Run the webpack build process for a development build and output a `stats.json` file that can be analyzed using a build analysis tool. Learn more about webpack build analysis in the ["Build Analysis" chapter from the SurviveJS webpack book](https://survivejs.com/books/webpack/optimizing/build-analysis).

You can always use `:production` in a script to control whether or not the build process should target the production environment.

Starters that involve multiple webpack processes will also provide variant scripts that isolate specific ones. For example, in the [React + Express + PostgreSQL with Server-Side Rendering starter](#TODO:), the `build` script runs the frontend and backend webpack processes together. If you wanted to only run one of these processes, a `backend:` and `frontend:` prefix variants are available so you could run something like `npm run frontend:build` to execute the frontend webpack process by itself.

## Build Targets

[Browserslist](https://github.com/browserslist/browserslist) is used by multiple tools in the build process to determine what compatibility-related code should be included so the app can perform properly for the project's established build targets. Contrary to its name, Browserslist isn't just for controlling browser targets; it is used for controlling Node.js version targets as well.

The following build process tools rely on Browserslist:

-   [webpack](https://webpack.js.org)
-   [Babel](https://babeljs.io)
-   [PostCSS](https://postcss.org)
-   [Autoprefixer](https://github.com/postcss/autoprefixer)

Edit the `.browserslistrc` file in the project's root directory to change build targets. For more information on configuring Browserslist, please read the TODO: Browserslist configuration document. Always try to define build targets as precisely as possible as it will exclude unnecessary code for irrelevant platforms and keep your build size as small as possible.

When working with Electron projects, you will also need to alter the webpack targets for the main process in `webpack/main.common.js` and the preload process in `webpack/preload.common.js`.

## Building Distributable Applications for Electron

LJAS uses [electron-builder](https://electron.build) to build distributable apps for macOS, Windows, and Linux.

Before building distributable apps, you must have an existing webpack production build, so make sure that `npm run build:production` has been run beforehand. Once that's available, run the following `package.json` script:

```console
npm run dist
```

This will use the webpack build in the `build/production/` directory and produce a distributable app in the `dist/` directory.

If you need to test the distributable app build process but you don't want to go through it completely, you can run the following script to generate the `dist/` directory without completely packaging the app:

```console
npm run pack
```

## Building Icons for Electron Applications

You can convert an image into icons for your app using the `make-icons` `package.json` script. This script is an alias for [`electron-icon-maker`](https://github.com/jaretburkett/electron-icon-maker).

Here is an example of this script converting a `.png` file:

```console
npm run make-icons -- --input=/absolute/path/file.png --output=./relative/path/to/folder
```

## Troubleshooting

#### How do I clear babel-loader's cache?

Delete the `node_modules/.cache/babel-loader` directory.
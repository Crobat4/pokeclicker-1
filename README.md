[![GitHub package.json version (branch)](https://img.shields.io/github/package-json/crobatVersion/pokeclicker/pokeclicker/develop-crobat?label=dev%20version)](https://github.com/Crobat4/pokeclicker/tree/develop-crobat)<br/>
[![GitHub package.json version (branch)](https://img.shields.io/github/package-json/crobatVersion/Crobat4/pokeclicker/master-crobat?label=live%20version)](https://crobat4.github.io/pokeclicker/)<br/>
[![Build Status](https://img.shields.io/travis/com/Crobat4/pokeclicker?logo=travis)](https://travis-ci.com/Crobat4/pokeclicker)<br/>

# PokéClicker - Crobat Fork
A game about catching Pokémon, defeating gym leaders, and watching numbers get bigger.

NOTE: PokéClicker is still in development!

You can try out the current state at https://crobat4.github.io/pokeclicker/

# Developer instructions

## Rules
- Make sure the build script is a success. We won't test Pull Requests that fail the building script.
- We won't accept balance Pull Requests, unless it's from a developer or Code Contributor (discord roles).
- Pull Requests adding new translatable content should link to a Pull Request in the [translation repo](https://github.com/pokeclicker/pokeclicker-translations) adding your new strings. See the Developer instructions on that repo for more info.
- Split Pull Requests into smaller Pull Requests when possible. It will make it easier for us to review, and easier for you if something's needs to be changed or is rejected.

## Editor/IDE setup

We have an [EditorConfig](https://editorconfig.org/) and linting configured, to help everyone write similar code. You will find our recommended plugins for VSCode below, however you should be able to find a plugin for other IDEs as well.

* [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)

## Building from Source

First make sure you have git and npm available as command-line utilities (so you should install Git and NodeJS if you don't have them already).

Open a command line interface in the directory that contains this README file, and use the following command to install PokéClicker's other dependencies locally:
```cmd
npm run clean
```

Then finally, run the following command in the command line interface to start a browser running PokéClicker.
```cmd
npm start
```

Changes to the sourcecode will automatically cause the browser to refresh.
This means you don't need to compile TypeScript yourself. Gulp will do this for you :thumbsup:


## Use Google cloud shell _(alternative)_
[![Google Cloud Shell](https://gstatic.com/cloudssh/images/open-btn.png)](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/pokeclicker/pokeclicker&git_branch=develop&page=editor&open_in_editor=README.md)
```cmd
npm clean-install
npm start
```
Click the [Web Preview](https://cloud.google.com/shell/docs/using-web-preview) Button and select port `3001` from the displayed menu.
Cloud Shell opens the preview URL on its proxy service in a new browser window.

## Deploying a new version to Github Pages
Before deploying, check that the game compiles and starts up without errors.

Then run the following:
```cmd
npm run website
```
This will populate the `/docs` folder.

After this command completes you can now publish this to your GitHub pages branch using:
```cmd
npm run publish
```
Which by default will push to the `master` branch

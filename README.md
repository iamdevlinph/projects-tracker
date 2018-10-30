# Projects Tracker

[![Greenkeeper badge](https://badges.greenkeeper.io/iamdevlinph/projects-tracker.svg)](https://greenkeeper.io/)

Track multiple public github repositories in one place.

#### React-Pkg Dependency Status

[![npm version][npm-img]][npm-url]
[![node version][node-img]][node-url]
[![deps][deps-img]][deps-url]

#### Repository Status

[![build][travis-img]][travis-url]
[![repo deps][repo-deps-img]][repo-deps-url]
[![open issues][issues-img]][issues-url]
[![open prs][pr-img]][pr-url]
![code size][code-size-img]
[![contributors][contributor-img]][contributor-url]

# Includes
- [React](https://github.com/facebook/react)
- [Redux](https://github.com/reactjs/redux)
- [redux-saga](https://github.com/redux-saga/redux-saga)
- [React Loadable](https://github.com/jamiebuilds/react-loadable)
- [React Router](https://github.com/ReactTraining/react-router)
- [Webpack](https://github.com/webpack/webpack)
- Ducks Pattern ["Official Proposal"](https://github.com/erikras/ducks-modular-redux)
- [styled-components](https://github.com/styled-components/styled-components)
- [lint-staged](https://github.com/okonet/lint-staged) for pre-commit hooks
- [Firebase](https://firebase.google.com/) & [FireStore](https://firebase.google.com/docs/firestore/)

More here on the [convenience package](https://github.com/codesandcoffees/react-pkg)

# App Structure
```
react-kit/
  .vscode/
  build/
  config/
  public/
  scripts/
  src/
  --components/
  --containers
  --routes/
  --sagaDucks/
  --services/
  --App.js
  --index.js
  --registerServiceWorker.js
  --store.js
  package.json
  README.md
```

# Getting Started
At the time of writing this, the following versions were used
```
node -v 8.11.3
npm -v 6.2.0
```

Install the packages
```
npm run install
```

Install `firebase-tools` and `eslint` globally

```
npm install -g firebase-tools eslint
```

# Commands
Run with `npm run <command>` if necessary
* **`start`** - Start the app and serve firebase locally. Access at [http://localhost:3000/](http://localhost:3000/)
* **`deploy`** - Deploy production build to `gh-pages` branch and deploy firebase functions.
* **`build`** - Will create a production ready build to the `build` folder.
* **`precommit`** - The precommit hook which runs lint-staged to lint staged files on commit.
* **`precommit:init`** - Install precommit related tools independently if you cannot see a precommit hook when you do a commit.

# Development
To start development server and access the site at [localhost:3000/](localhost:3000/)
```
npm run start
```

And if you only want to build the files
```
npm run build-only
```

## Deploy `firebase functions`

```
firebase login // if needed
firebase deploy
```

# Making it yours
Update the following files:
* [Firebase App Config](./src/sagaDucks/rsf.js)
* [Firebase Function API Url](./src/services/firebase-functions.js)
* [Homepage Field in package.json](./package.json). Read more [here](#deployment)
* [README.md Variables](./README.md)
* [Link to your Github repo in the navbar.js](./src/components/Navbar/Navbar.js)

# Deployment
The deployment process in this app only supports github pages using the `gh-pages` branch. To set it up:
1. Make necessary changes to your repository's settings.

Change the `source` to `gh-pages branch`.

If you have your own domain. Input your `custom domain` if you have and don't forget to add a `CNAME` file in the `public` folder. This will handle the redirecting from `github pages` to your custom domain.

![gh-pages settings](https://res.cloudinary.com/dfrhytey3/image/upload/v1522392328/gh-pages_rwrv32.png)

2. In the `package.json` change the `homepage` property with the url where the app will be accessed
```
// for github pages domain
"homepage": "https://<username>.github.io/<repository_name>"

// for custom domains just put your own domain
"homepage": "<your_custom_domain_here>"
```
3. After setting up the correct url for `homepage` you can now deploy using
```
npm run deploy
```
This will build the files and deploy them to the `gh-pages` branch

4. Access your app with the url you used in the `homepage` property.

---

This project was bootstrapped with [React Kit](https://github.com/codesandcoffees/react-kit) which is based on [Create React App](https://github.com/facebookincubator/create-react-app).

Read the original [README.md](/README-orig.md)

<!-- React PKG Details -->
[npm-img]: https://img.shields.io/npm/v/@codes-and-coffees/react-pkg.svg?style=flat-square&maxAge=86400
[npm-url]: https://www.npmjs.com/package/@codes-and-coffees/react-pkg
[node-img]: https://img.shields.io/node/v/@codes-and-coffees/react-pkg.svg?style=flat-square&maxAge=86400
[node-url]: https://nodejs.org/en/
[deps-img]: https://img.shields.io/david/codesandcoffees/react-pkg.svg?style=flat-square&maxAge=86400
[deps-url]: https://david-dm.org/codesandcoffees/react-pkg

<!-- Repo Details -->
[issues-url]: https://github.com/iamdevlinph/projects-tracker/issues
[issues-img]: https://img.shields.io/github/issues/iamdevlinph/projects-tracker.svg?style=flat-square&maxAge=86400
[pr-img]: https://img.shields.io/github/issues-pr/iamdevlinph/projects-tracker.svg?style=flat-square&maxAge=86400
[pr-url]: https://github.com/iamdevlinph/projects-tracker/pulls
[contributor-img]: https://img.shields.io/github/contributors/iamdevlinph/projects-tracker.svg?style=flat-square&maxAge=86400
[contributor-url]: https://github.com/iamdevlinph/projects-tracker/graphs/contributors
[code-size-img]: https://img.shields.io/github/languages/code-size/iamdevlinph/projects-tracker.svg?style=flat-square&maxAge=86400
[repo-deps-img]: https://img.shields.io/david/iamdevlinph/projects-tracker.svg?style=flat-square&maxAge=86400
[repo-deps-url]: https://david-dm.org/iamdevlinph/projects-tracker
[travis-img]: https://img.shields.io/travis/iamdevlinph/projects-tracker/master.svg?style=flat-square&maxAge=86400
[travis-url]: https://travis-ci.com/iamdevlinph/projects-tracker

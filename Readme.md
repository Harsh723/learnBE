"type": "module" -> I want to use import syntax (es6) not require syntax

Prettier -> Prettier is an opinionated code formatter. It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary.

.prettierignore -> add file names in which we don’t want to apply linting

Nodemon helps the local server to re run on every changes made in local.
nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.
npm i -D nodemon
"scripts": {
    "dev": "nodemon src/index.js"
  },

module.exports = {
  "extends": "airbnb",
  "rules": {
    // react stuff
    "react/prefer-stateless-function": 0,
    "react/jsx-filename-extension": 0,
    "import/no-extraneous-dependencies": 0, // to allow the convenience package
    "jsx-a11y/anchor-is-valid": 0,
    "react/forbid-prop-types": 0, // for object prop type,
    "import/prefer-default-export": 0,
    "no-console": ["error", { allow: ["error"] }],
    "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 1 }]
  },
  "globals": {
    "document": true,
    "fetch": true,
    "window": true
  },
  "parser": "babel-eslint"
};

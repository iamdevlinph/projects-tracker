module.exports = {
  "processors": ["stylelint-processor-styled-components"],
  "extends": [
    "stylelint-config-recommended",
    "stylelint-config-styled-components"
  ],
  "rules": {
    "color-hex-case": "upper",
    "color-hex-length": "long",
  }
};

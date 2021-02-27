// commitlint doesn't support ES6 modules, so config has to be exported as CommonJS module and have
// .cjs extension to work properly with commitlint

module.exports = {
  extends: ['@commitlint/config-conventional'],
};

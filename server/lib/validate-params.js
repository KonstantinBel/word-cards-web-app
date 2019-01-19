/* eslint no-underscore-dangle: 0 */

class Checker {
  constructor() {
    this.errors = [];
  }

  static isExist(param) {
    return !!param && param !== '';
  }

  static isNumber(param) {
    return param !== '' && Number.isInteger(Number(param, 10));
  }

  static isArray(param) {
    return Array.isArray(param);
  }

  static isNumbersArray(param) {
    if (Array.isArray(param)) {
      if (param.length === 0) return true;
      if (param.some(val => !Checker.isNumber(val))) return false;
      return true;
    }
    return false;
  }

  static getStringCheck(min, max) {
    function isString(param) {
      return (param.length >= min) && (!max || param.length <= max);
    }
    return isString;
  }

  _runCheck(paramName, param, checks) {
    if (param === undefined || checks.length === 0) return;
    let isValid = false;

    checks.forEach((fun) => { if (fun(param)) isValid = true; });
    if (!isValid) {
      const checksNames = [];
      checks.forEach((fun) => { checksNames.push(fun.name); });
      this.errors.push({
        message: 'type error',
        path: paramName,
        value: param,
        requiredTypes: checksNames,
      });
    }
  }

  check(paramName, param, checks = [], isRequired) {
    if (isRequired) {
      if (!Checker.isExist(param)) {
        this.errors.push({
          message: 'type error',
          path: paramName,
          value: null,
          requiredTypes: ['any'],
        });
      } else {
        this._runCheck(paramName, param, checks);
      }
    } else {
      this._runCheck(paramName, param, checks);
    }

    return this.errors;
  }
}

module.exports = Checker;

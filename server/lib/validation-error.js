const ResponseError = require('../lib/response-error');

class ValidationError extends ResponseError {
  constructor(errors = []) {
    super();
    this.details = {
      type: 'error',
      message: 'validation error',
      errors,
    };
    this.status = 400;
  }
}

module.exports = ValidationError;

class ResponseError extends Error {
  constructor(details = {}) {
    super(details.message || 'Error without message');
    this.details = details;
    this.status = details.status || '';
  }

  print() {
    console.log('\n---------error---------');
    console.log(`message: ${this.message}`);
    console.log(this.details);
    console.log('-----------------------\n');
  }
}

module.exports = ResponseError;

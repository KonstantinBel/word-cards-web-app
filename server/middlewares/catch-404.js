const ResponseError = require('../lib/response-error');

module.exports = (err, req, res, next) => {
  err = err || (new ResponseError({ // eslint-disable-line
    type: 'error',
    message: 'page not found',
    agrs: { url: req.url },
    status: 404,
  }));
  next(err);
};

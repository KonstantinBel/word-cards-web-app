const ResponseError = require('../lib/response-error');

module.exports = (err, req, res, next) => {
  // console output
  if (err instanceof ResponseError) {
    err.print();
  } else {
    console.log('\n---------unexpected_error--------');
    console.log(`${err.stack}  \n----------------------------\n`);
  }

  // response
  if (err.status === '404') {
    res.render('page-404.pug', { devMode: res.locals.devMode });
  } else {
    const status = err.status || 500;
    res.status(status);
    res.send(err.details || {
      type: 'unknown server error',
      status: global.DEV_MODE && status,
      messae: global.DEV_MODE && err.message,
      stack: global.DEV_MODE && err.stack,
    });
  }

  next();
};

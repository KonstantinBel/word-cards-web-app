const getLocale = require('../locale');

module.exports = (req, res, next) => {
  res.locals.t = getLocale(req.cookies.userlang || req.locale);
  next();
};

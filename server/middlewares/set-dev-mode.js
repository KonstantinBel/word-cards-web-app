module.exports = (req, res, next) => {
  res.locals.devMode = global.DEV_MODE;
  next();
};

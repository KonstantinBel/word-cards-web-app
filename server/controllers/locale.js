module.exports = (req, res, next) => {
  res.send(res.locals.t.wordCardsApp);
  next();
};

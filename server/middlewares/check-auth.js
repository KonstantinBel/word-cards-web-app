const ResponseError = require('../lib/response-error');

module.exports = (groups = []) => (
  (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next(new ResponseError({ type: 'error', message: 'need authorization', status: 401 }));
    }

    let isChecked = true;
    if (groups.length > 0) {
      isChecked = !!groups.find(val => val === req.user.access_group);
    }

    if (!isChecked) {
      return next(new ResponseError({
        type: 'error',
        message: 'not enough rights',
        arg: {
          userName: req.user.local_name || req.user.google_name,
          userGroup: req.user.access_group,
          groupList: groups,
        },
        status: 401,
      }));
    }

    next();
    return null;
  }
);

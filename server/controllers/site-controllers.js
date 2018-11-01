exports.profile = (req, res, next) => {
  const name = req.user.local_name || req.user.google_name;
  const { email } = req.user;

  res.send({
    type: 'ok',
    message: 'profile page',
    arg: {
      userName: name,
      email,
      userGroup: req.user.access_group,
    },
  });

  next();
};

exports.adminPage = (req, res, next) => {
  res.send({
    type: 'ok',
    message: 'admin page',
    arg: {
      text: 'Very secret admin info',
    },
  });

  next();
};

exports.publicPage = (req, res, next) => {
  res.send({
    type: 'ok',
    message: 'public page',
    agr: 'Simple public info',
  });

  next();
};

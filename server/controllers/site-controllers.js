exports.profile = function (req, res, next) {
  let name = req.user.local_name || req.user.google_name
  let email = req.user.email

  res.send({
    type: 'ok',
    message: 'profile page',
    arg: {
      userName: name,
      email: email,
      userGroup: req.user.access_group
    }
  })
}

exports.adminPage = function (req, res, next) {
  res.send({
    type: 'ok',
    message: 'admin page',
    arg: {
      text: 'Very secret admin info'
    }
  })
}

exports.publicPage = function (req, res, next) {
  res.send({
    type: 'ok',
    message: 'public page',
    agr: 'Simple public info'
  })
}

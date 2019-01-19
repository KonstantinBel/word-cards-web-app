const ResponseError = require('../lib/response-error');

// TODO: написать тесты
function getGroupsPermission(groups = []) {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      if (req.user.access_group === 'admin') {
        next();
        return null;
      }
      if (groups.length > 0 && !!groups.find(val => val === req.user.access_group)) {
        next();
      } else {
        next(new ResponseError({
          type: 'error',
          message: 'not enough rights',
          arg: {
            userName: req.user.local_name || req.user.google_name,
            userGroup: req.user.access_group,
            requiredGroups: groups,
          },
          status: 401,
        }));
      }
    } else {
      next(new ResponseError({ type: 'error', message: 'need authorization', status: 401 }));
    }

    return null;
  };
}

function userAccess(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    next(new ResponseError({ type: 'error', message: 'need authorization', status: 401 }));
  }
}

function ownerAccess(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.access_group === 'admin') {
      next();
      return null;
    }
    if (req.params.userId && req.params.userId === req.user.id.toString()) {
      next();
    } else {
      next(new ResponseError({ type: 'error', message: 'need to be resource owner', status: 401 }));
    }
  } else {
    next(new ResponseError({ type: 'error', message: 'need authorization', status: 401 }));
  }

  return null;
}

function editorAccess(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.access_group === 'admin') {
      next();
      return null;
    }
    if (req.params.userId && (req.params.userId === req.user.id.toString() || req.user.access_group === 'editor')) {
      next();
    } else {
      next(new ResponseError({ type: 'error', message: 'need to be resource owner', status: 401 }));
    }
  } else {
    next(new ResponseError({ type: 'error', message: 'need authorization', status: 401 }));
  }

  return null;
}

exports.adminAccess = getGroupsPermission();
exports.siteEditorAccess = getGroupsPermission(['editor']);
exports.userAccess = userAccess;
exports.ownerAccess = ownerAccess;
exports.editorAccess = editorAccess;

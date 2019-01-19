const db = require('../models');
const processError = require('../lib/process-error');
const ValidationError = require('../lib/validation-error');

module.exports = {
  get: (req, res, next) => {
    db.Rubric.findAll({
      attributes: ['id', 'name'],
    })
      .then((data) => { res.send({ type: 'ok', data }); })
      .catch((err) => { next(new ValidationError(processError(err))); });
  },

  add: (req, res, next) => {
    const { names } = req.body;

    db.Rubric.addRubrics(names)
      .then((row) => { res.send({ type: 'ok', data: row }); })
      .catch((err) => { next(new ValidationError(processError(err))); });
  },

  remove: (req, res, next) => {
    const { id, ids } = req.body;
    const query = id || ids;

    db.Rubric.destroy({
      where: { id: query },
      returning: true,
    })
      .then((data) => { res.send({ type: 'ok', message: `removed ${data} rubrics` }); })
      .catch((err) => { next(new ValidationError(processError(err))); });
  },

  edit: (req, res, next) => {
    const { id, name } = req.body;

    db.Rubric.update(
      { name },
      { where: { id } },
    )
      .then((row) => { res.send({ type: 'ok', data: row }); })
      .catch((err) => { next(new ValidationError(processError(err))); });
  },
};

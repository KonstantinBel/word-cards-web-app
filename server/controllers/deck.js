const db = require('../models');
const processError = require('../lib/process-error');
const ValidationError = require('../lib/validation-error');

module.exports = {
  // FIXME: жирноватый контроллер, подумать над тем, что бы разгрузить его
  get: (req, res, next) => {
    const {
      name,
      level,
      type,
      rubricId,
      userId,
    } = req.body;

    const deckQuery = {
      name,
      level,
      type,
      RubricId: rubricId,
    };

    const userQuery = {
      id: userId,
    };

    Object.keys(deckQuery).forEach((key) => { if (!deckQuery[key]) delete deckQuery[key]; });
    Object.keys(userQuery).forEach((key) => { if (!userQuery[key]) delete userQuery[key]; });

    // FIXME: не отдаются колоды не привязанные к юзеру (без инклуда отдаются)
    db.Deck.findAll({
      where: deckQuery,
      include: [{
        model: db.User,
        where: userQuery,
        attributes: ['email'],
      }],
    })
      .then((row) => { res.send({ type: 'ok', data: row }); })
      .catch((err) => { next(new ValidationError(processError(err))); });
  },
};

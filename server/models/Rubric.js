const ValidationError = require('../lib/validation-error');
const Checker = require('../lib/validate-params');

module.exports = (sequelize, DataTypes) => {
  const Rubric = sequelize.define('Rubric', {
    id: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 20],
      },
    },
  });

  Rubric.associate = (models) => {
    Rubric.hasMany(models.Deck);
  };

  Rubric.addRubrics = (names) => {
    const checker = new Checker();

    checker.check('names', names, [Checker.isArray], true);
    if (Object.keys(checker.errors).length > 0) throw new ValidationError(checker.errors);

    const data = [];
    names.forEach((name) => { data.push({ name }); });

    return (
      Rubric.bulkCreate(data, {
        validate: true,
        returning: true,
      })
    );
  };

  return Rubric;
};

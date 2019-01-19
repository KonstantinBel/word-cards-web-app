module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define('Subject', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });

  Subject.associate = (models) => {
    Subject.hasMany(models.Word);
    Subject.belongsToMany(models.Deck, { through: models.DeckSubject });
  };

  return Subject;
};

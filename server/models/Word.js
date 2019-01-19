module.exports = (sequelize, DataTypes) => {
  const Word = sequelize.define('Word', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transcription: DataTypes.STRING,
  });

  Word.associate = (models) => {
    Word.belongsTo(models.Language);
    Word.belongsTo(models.Subject);
    Word.belongsToMany(models.User, { through: models.WordProp });
  };

  return Word;
};

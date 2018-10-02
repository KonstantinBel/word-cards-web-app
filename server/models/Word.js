module.exports = function (sequelize, DataTypes) {
  const Word = sequelize.define('Word', {
    word_id: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true
    },
    russian: DataTypes.STRING,
    english: DataTypes.STRING,
    german: DataTypes.STRING
  })

  Word.associate = (models) => {
    Word.belongsToMany(models.Desc, {through: 'WordDesc'})
  }

  return Word
}

module.exports = function (sequelize, DataTypes) {
  const Language = sequelize.define('Language', {
    language_id: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING
  })

  return Language
}

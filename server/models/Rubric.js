module.exports = function (sequelize, DataTypes) {
  const Rubric = sequelize.define('Rubric', {
    rubric_id: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING
  })

  Rubric.associate = (models) => {
    Rubric.hasMany(models.Desc, {foreignKey: 'rubric_id'})
  }

  return Rubric
}

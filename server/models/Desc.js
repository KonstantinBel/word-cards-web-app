module.exports = function (sequelize, DataTypes) {
  const Desc = sequelize.define('Desc', {
    desk_id: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    level: DataTypes.STRING,
    price: DataTypes.FLOAT,
    type: DataTypes.STRING,
    rubric_id: DataTypes.SMALLINT
  })

  Desc.associate = (models) => {
    Desc.belongsTo(models.Rubric, {foreignKey: 'rubric_id'})
    Desc.belongsToMany(models.User, {through: 'UserDesc'})
    Desc.belongsToMany(models.Word, {through: 'WordDesc'})
  }

  return Desc
}

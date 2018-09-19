module.exports = function (sequelize, DataTypes) {
  const Banner = sequelize.define('Banner', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    slot: DataTypes.INTEGER,
    url: DataTypes.STRING,
    text: DataTypes.TEXT('tiny'),
    img_id: DataTypes.INTEGER
  })

  Banner.prototype.getItem = function (options) {
    return this['get' + this.get('page_table').substr(0, 1).toUpperCase() + this.get('page_table').substr(1)](options)
  }

  Banner.associate = (models) => {
    Banner.belongsTo(models.Img, {foreignKey: 'img_id'})
  }

  return Banner
}

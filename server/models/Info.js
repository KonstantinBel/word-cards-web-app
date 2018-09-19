module.exports = function (sequelize, DataTypes) {
  const Info = sequelize.define('Info', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    slot: DataTypes.INTEGER,
    text: DataTypes.TEXT('tiny')
  })

  Info.prototype.getItem = function (options) {
    return this['get' + this.get('page_table').substr(0, 1).toUpperCase() + this.get('page_table').substr(1)](options)
  }

  Info.associate = (models) => {
  }

  return Info
}

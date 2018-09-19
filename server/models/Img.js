module.exports = function (sequelize, DataTypes) {
  const Img = sequelize.define('Img', {
    img_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    file_name: DataTypes.STRING,
    file_path: DataTypes.STRING
  })

  return Img
}

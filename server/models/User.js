const bcrypt = require('bcryptjs')

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    access_group: {
      type: DataTypes.STRING,
      defaultValue: 'user'
    },
    email: {
      type: DataTypes.STRING,
      isEmail: true,
      unique: true
    },
    local_name: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    google_name: DataTypes.STRING,
    google_id: DataTypes.STRING,
    google_token: DataTypes.STRING,
  })

  User.beforeSave((user, options) => {
    if (user.password) {
      return bcrypt.hash(user.password, 10)
        .then(res => {
          user.password = res
        })
        .catch(err => console.log(err))
    }
  })

  User.associate = (models) => {
    User.belongsToMany(models.Desc, {through: 'UserDesc'})
  }

  return User
}

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    access_group: {
      type: DataTypes.ENUM('user', 'editor', 'admin'),
      defaultValue: 'user',
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    local_name: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: [2, 50],
      },
    },
    google_name: DataTypes.STRING,
    google_id: {
      type: DataTypes.STRING,
      unique: true,
    },
    google_token: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
  }, {
    validate: {
      hasName() {
        if (!this.local_name && !this.google_name) {
          throw new Error('Requires user name');
        }
      },
    },
  });

  User.associate = (models) => {
    User.belongsTo(models.Language);
    User.belongsToMany(models.Deck, { through: models.UserDeck });
    User.belongsToMany(models.Word, { through: models.WordProp });
  };

  User.beforeSave((user) => {
    if (user.password) {
      return bcrypt.hash(user.password, 10)
        .then((res) => {
          // eslint-disable-next-line no-param-reassign
          user.password = res;
        })
        .catch(err => console.log(err));
    }
    return false;
  });

  return User;
};

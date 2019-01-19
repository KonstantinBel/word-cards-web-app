module.exports = (sequelize, DataTypes) => {
  const UserDeck = sequelize.define('UserDeck', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });

  return UserDeck;
};

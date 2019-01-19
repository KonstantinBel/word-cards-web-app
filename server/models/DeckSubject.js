module.exports = (sequelize, DataTypes) => {
  const DeckSubject = sequelize.define('DeckSubject', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });

  return DeckSubject;
};

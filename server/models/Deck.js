module.exports = (sequelize, DataTypes) => {
  const Deck = sequelize.define('Deck', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    level: DataTypes.ENUM(
      'elementary',
      'pre-intermediate',
      'intermediate',
      'upper-intermediate',
      'advanced',
      'proficiency',
    ),
    price: DataTypes.FLOAT,
    type: DataTypes.ENUM('private', 'public', 'paid'),
  });

  Deck.associate = (models) => {
    Deck.belongsTo(models.Rubric);
    Deck.belongsToMany(models.User, { through: models.UserDeck });
    Deck.belongsToMany(models.Subject, { through: models.DeckSubject });
  };

  return Deck;
};

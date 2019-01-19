module.exports = (sequelize, DataTypes) => {
  const WordProp = sequelize.define('WordProp', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rate: {
      type: DataTypes.SMALLINT,
      defaultValue: 0,
    },
  });

  return WordProp;
};

const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const defaultData = require('../default-data');

const basename = path.basename(module.filename);
const resetDb = global.RESET_DB;
const setDemoData = global.SET_DEMO_DATA;
const db = {};

console.log('Start db init');

/**
 * Sequelize connection settings
 */

const sequelize = new Sequelize(global.DB_NAME, global.DB_USER, global.DB_PASS, {
  host: global.DB_HOST,
  port: global.DB_PORT,
  dialect: 'postgres',
  operatorsAliases: false,
  logging: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  define: {
    timestamps: false,
  },
});

/**
 * Add all models to db from files in models dir
 * https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize
 * (part 4, refactoring)
*/

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

// execute associate functions (establish links between tables) if exist
Object.keys(db).forEach((key) => { if (db[key].associate) db[key].associate(db); });

db.init = () => sequelize
  .authenticate()
  .then(() => (resetDb ? sequelize.drop() : Promise.resolve))
  .then(() => db.Language.sync())
  .then(() => db.User.sync())
  .then(() => db.Rubric.sync())
  .then(() => db.Subject.sync())
  .then(() => db.Deck.sync())
  .then(() => db.Word.sync())
  .then(() => db.DeckSubject.sync())
  .then(() => db.UserDeck.sync())
  .then(() => db.WordProp.sync())
  .then(() => db.Session.sync())
  .then(() => sequelize.sync())
  .then(() => (setDemoData ? defaultData(db) : Promise.resolve))
  .then(() => {
    console.log('DB connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

db.sequelize = sequelize;
module.exports = db;

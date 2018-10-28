const Sequelize = require('sequelize')
const fs = require('fs')
const path = require('path')
const basename = path.basename(module.filename)
const resetDb = global.RESET_DB
const setDemoData = global.SET_DEMO_DATA
let db = {}

console.log('Start db init')

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
    timestamps: false
  }
})

/**
 * Add all models to db from files in models dir
 * https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize
 * (part 4, refactoring)
*/

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(function (file) {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

// execute associate functions (establish links between tables) if exist
for (const key in db) {
  if (db.hasOwnProperty(key) && db[key].associate) {
    db[key].associate(db)
  }
}

db.init = function () {
  return sequelize
    .authenticate()
    .then(() => resetDb ? sequelize.drop() : Promise.resolve)
    .then(() => this.Session.sync())
    .then(() => this.User.sync())
    .then(() => this.Rubric.sync())
    .then(() => this.Desc.sync())
    .then(() => this.Word.sync())
    .then(() => this.Language.sync())
    .then(() => sequelize.sync())
    .then(() => setDemoData ? require('../default-data')(this) : Promise.resolve) // настроит кодировку или перейти на postgre
    .then(() => {
      console.log('DB connection has been established successfully.')
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err)
    })
}

db.sequelize = sequelize
module.exports = db

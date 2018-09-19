const Sequelize = require('sequelize')
const fs = require('fs')
const path = require('path')
const basename = path.basename(module.filename)
let db = {}

/**
 * Sequelize connection settings
 */

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  operatorsAliases: false,
  logging: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  define: {
    timestamps: false
  }
})

db.sequelize = sequelize

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

module.exports = db

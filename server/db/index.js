const resetDb = global.RESET_DB

module.exports = function (db) {
  db.sequelize
    .authenticate()
    .then(() => resetDb ? db.sequelize.dropAllSchemas() : Promise.resolve)
    .then(() => db.Session.sync())
    .then(() => db.Img.sync())
    .then(() => db.Banner.sync())
    .then(() => db.User.sync())
    .then(() => db.Info.sync())
    // .then(() => resetDb ? require('./default-data')() : Promise.resolve) // настроит кодировку или перейти на postgre
    .then(() => {
      console.log('DB connection has been established successfully.')
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err)
    })
}

const { Sequelize } = require('sequelize')
//const isDev = require('electron-is-dev')

/* const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: isDev
    ? 'public/server/database/data/database.sqlite'
    : '/inventorysystemdata/data/database.sqlite'
  //logging: false
}) */

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'public/server/database/data/database.sqlite'
  //logging: false
})

const dbinit = async () => {
  try {
    await sequelize.authenticate()
    console.log('conectado a la DB')
    await sequelize.sync({ force: false })
    console.log('database online')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

module.exports = { sequelize, dbinit }

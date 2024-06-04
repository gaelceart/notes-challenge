import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  host: 'db.sqlite',
  storage: './data/db.sqlite',
  define: {
    timestamps: false
  },
  force: false
})

export const queryInterface = sequelize.getQueryInterface()

export const sync = async () => await sequelize.sync().catch(console.error)

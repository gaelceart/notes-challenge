import { DataTypes } from 'sequelize'
import { sequelize } from '../utils/sequelize.js'

export const Note = sequelize.define('Note', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.TEXT,
    defaultValue: 'ACTIVE',
    allowNull: false
  },
  createdAt: {
    type: 'TIMESTAMP',
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  updatedAt: {
    type: 'TIMESTAMP',
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
})

export const Tagged = sequelize.define('Tagged', {
  note_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  tag: {
    type: DataTypes.TEXT,
    primaryKey: true
  }
})

export const load = () => true

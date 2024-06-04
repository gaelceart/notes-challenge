import { sync, queryInterface } from '../utils/sequelize.js'
import { NOTE_STATUS } from './NOTE_STATUS.js'

export const addConstraints = () => {
  sync().then(async () => {
    await queryInterface.addConstraint('Notes', {
      fields: ['status'],
      type: 'check',
      where: {
        status: NOTE_STATUS
      }
    })

    await queryInterface.addConstraint('Taggeds', {
      fields: ['note_id'],
      type: 'foreign key',
      name: 'note_id_fk',
      references: {
        table: 'Notes',
        fields: ['id']
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  })
}

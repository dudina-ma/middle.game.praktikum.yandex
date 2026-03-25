/* eslint-disable @typescript-eslint/no-unused-vars -- декораторы sequelize-typescript */
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript'

@Table({
  tableName: 'reactions',
  timestamps: true,
  indexes: [
    {
      name: 'reactions_user_target_unique',
      unique: true,
      fields: ['userId', 'targetType', 'targetId'],
    },
    {
      name: 'reactions_target_lookup',
      fields: ['targetType', 'targetId'],
    },
  ],
})
export class Reaction extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare userId: number

  @Column({ type: DataType.ENUM('comment', 'reply'), allowNull: false })
  declare targetType: 'comment' | 'reply'

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare targetId: number

  @Column({ type: DataType.STRING(16), allowNull: false })
  declare emoji: string
}

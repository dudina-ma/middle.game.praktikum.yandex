/* eslint-disable @typescript-eslint/no-unused-vars -- декораторы sequelize-typescript */
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  Length,
} from 'sequelize-typescript'
import { User } from './User'

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

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare userId: number

  @BelongsTo(() => User, { foreignKey: 'userId', as: 'user' })
  declare user?: User

  @Column({ type: DataType.ENUM('comment', 'reply'), allowNull: false })
  declare targetType: 'comment' | 'reply'

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare targetId: number

  @Length({ min: 1, max: 16 })
  @Column({ type: DataType.STRING(16), allowNull: false })
  declare emoji: string
}

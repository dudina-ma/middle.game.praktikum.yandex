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
} from 'sequelize-typescript'
import { User } from './User'

@Table({
  tableName: 'comments',
  timestamps: true,
})
export class Comment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare authorId: number

  @BelongsTo(() => User, { foreignKey: 'authorId', as: 'author' })
  declare author?: User

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare topicId: number

  @Column(DataType.TEXT)
  declare text: string
}

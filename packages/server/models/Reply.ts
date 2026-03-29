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
  HasMany,
  Length,
} from 'sequelize-typescript'
import { User } from './User'
import { TEXT_CONTENT_MAX_LENGTH } from '../constants/validationLimits'

@Table({
  tableName: 'replies',
  timestamps: true,
})
export class Reply extends Model {
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
  declare commentId: number

  @ForeignKey(() => Reply)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare parentReplyId: number | null

  @BelongsTo(() => Reply, { foreignKey: 'parentReplyId', as: 'parentReply' })
  declare parentReply?: Reply

  @HasMany(() => Reply, { foreignKey: 'parentReplyId', as: 'childReplies' })
  declare childReplies?: Reply[]

  @Length({ min: 1, max: TEXT_CONTENT_MAX_LENGTH })
  @Column(DataType.TEXT)
  declare text: string
}

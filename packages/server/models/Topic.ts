/* eslint-disable @typescript-eslint/no-unused-vars -- декораторы sequelize-typescript; без project-aware lint импорты и класс считаются неиспользуемыми */
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
import {
  TEXT_CONTENT_MAX_LENGTH,
  TOPIC_TITLE_MAX_LENGTH,
} from '../constants/validationLimits'

@Table({
  tableName: 'topics',
  timestamps: true,
})
export class Topic extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number

  @Length({ min: 1, max: TOPIC_TITLE_MAX_LENGTH })
  @Column({ type: DataType.STRING(TOPIC_TITLE_MAX_LENGTH), allowNull: false })
  declare title: string

  @Length({ min: 1, max: TEXT_CONTENT_MAX_LENGTH })
  @Column({ type: DataType.TEXT, allowNull: false })
  declare content: string

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare authorId: number

  @BelongsTo(() => User, { foreignKey: 'authorId', as: 'author' })
  declare author?: User
}

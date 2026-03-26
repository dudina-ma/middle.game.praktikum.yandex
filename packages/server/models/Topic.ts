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
} from 'sequelize-typescript'
import { User } from './User'

@Table({
  tableName: 'topics',
  timestamps: true,
})
export class Topic extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number

  @Column(DataType.STRING)
  declare title: string

  @Column(DataType.TEXT)
  declare content: string

  @Column({ type: DataType.INTEGER, allowNull: true })
  declare categoryId: number | null

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare authorId: number

  @BelongsTo(() => User, { foreignKey: 'authorId', as: 'author' })
  declare author?: User

  @Column({ type: DataType.TEXT, allowNull: true })
  declare tags: string | null
}

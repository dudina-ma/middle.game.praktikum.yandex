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

@Table({
  tableName: 'topics',
  timestamps: true,
})
export class Topic extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number

  @Length({ min: 1, max: 255 })
  @Column({ type: DataType.STRING(255), allowNull: false })
  declare title: string

  @Length({ min: 1, max: 50_000 })
  @Column({ type: DataType.TEXT, allowNull: false })
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

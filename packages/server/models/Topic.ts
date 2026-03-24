/* eslint-disable @typescript-eslint/no-unused-vars -- декораторы sequelize-typescript; без project-aware lint импорты и класс считаются неиспользуемыми */
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript'

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

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare authorId: number

  @Column({ type: DataType.TEXT, allowNull: true })
  declare tags: string | null
}

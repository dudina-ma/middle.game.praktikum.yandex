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
  tableName: 'comments',
  timestamps: true,
})
export class Comment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare authorId: number

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare topicId: number

  @Column(DataType.TEXT)
  declare text: string
}

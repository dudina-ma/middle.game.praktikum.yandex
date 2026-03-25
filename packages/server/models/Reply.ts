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
  tableName: 'replies',
  timestamps: true,
})
export class Reply extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare authorId: number

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare commentId: number

  @Column(DataType.TEXT)
  declare text: string
}

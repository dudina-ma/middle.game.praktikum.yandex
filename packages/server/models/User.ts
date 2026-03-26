/* eslint-disable @typescript-eslint/no-unused-vars -- декораторы sequelize-typescript */
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Length,
} from 'sequelize-typescript'

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare id: number

  @Length({ min: 1, max: 255 })
  @Column({ type: DataType.STRING, allowNull: false, field: 'first_name' })
  declare firstName: string

  @Length({ min: 1, max: 255 })
  @Column({ type: DataType.STRING, allowNull: false, field: 'second_name' })
  declare secondName: string

  @Length({ min: 1, max: 255 })
  @Column({ type: DataType.STRING, allowNull: false, field: 'display_name' })
  declare displayName: string
}

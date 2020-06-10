import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm'

export enum ProductType {
  PIZZA = 'PIZZA',
  DRINK = 'DRINK',
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 60, unique: true })
  name: string

  @Column({ length: 255 })
  description: string

  @Column({ length: 255 })
  pictureUrl: string

  @Column({
    type: 'enum',
    enum: ProductType,
    default: ProductType.PIZZA,
  })
  @Index()
  type: string

  @Column({ type: 'integer' })
  price: number // All prices are based in Euro and without commas (Ex: €50.00 = 5000)

  @CreateDateColumn()
  createdAt: Date
}

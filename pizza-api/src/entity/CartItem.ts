import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm'

import { Cart } from './Cart'
import { Product } from './Product'

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Cart, (item) => item.items)
  cart: Cart

  @ManyToOne(() => Product)
  product: Product

  @Column({ type: 'integer' })
  quantity: number

  @Column({ length: 255 })
  comments: string

  @CreateDateColumn()
  createdAt: Date
}

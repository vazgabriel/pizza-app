import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm'

import { Cart } from './Cart'
import { Product } from './Product'

@Entity()
@Index(['cartId', 'productId'], { unique: true })
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Cart, (item) => item.items)
  cart: Cart

  @Column({ type: 'integer' })
  cartId: number

  @ManyToOne(() => Product, { eager: true })
  @JoinColumn()
  product: Product

  @Column({ type: 'integer' })
  productId: number

  @Column({ type: 'integer' })
  quantity: number

  @Column({ length: 255, nullable: true })
  comments: string

  @CreateDateColumn()
  createdAt: Date
}

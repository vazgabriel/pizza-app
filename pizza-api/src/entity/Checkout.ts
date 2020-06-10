import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  CreateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm'

import { Cart } from './Cart'
import { User } from './User'

export enum Currency {
  EURO = 'EUR',
  DOLAR = 'USD',
}

export const CURRENCIES = [Currency.EURO, Currency.DOLAR]

@Entity()
export class Checkout {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 100 })
  address: string

  @Column({ length: 50, nullable: true })
  address_2: string

  @Column({ type: 'integer' })
  foodPrice: number // All prices are based in Euro and without commas (Ex: €50.00 = 5000)

  @Column({ type: 'integer' })
  deliveryPrice: number // All prices are based in Euro and without commas (Ex: €50.00 = 5000)

  @Column({ type: 'integer' })
  totalPrice: number // All prices are based in Euro and without commas (Ex: €50.00 = 5000)

  @Column({
    type: 'enum',
    enum: Currency,
    default: Currency.EURO,
  })
  @Index()
  currency: string

  @OneToOne(() => Cart)
  @JoinColumn()
  cart: Cart

  @Column({ type: 'integer' })
  cartId: number

  @ManyToOne(() => User)
  user: User

  @Column({ type: 'integer' })
  @Index()
  userId: number

  @CreateDateColumn()
  createdAt: Date
}

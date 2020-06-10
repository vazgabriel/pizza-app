import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  CreateDateColumn,
} from 'typeorm'

import { Cart } from './Cart'

export enum Currency {
  EURO = 'EUR',
  DOLAR = 'USD',
}

@Entity()
export class Checkout {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 100 })
  address: string

  @Column({ length: 50 })
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
  currency: string

  @OneToOne(() => Cart)
  @JoinColumn()
  cart: Cart

  @CreateDateColumn()
  createdAt: Date
}

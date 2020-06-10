import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm'

import { CartItem } from './CartItem'
import { User } from './User'

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number

  @OneToMany(() => CartItem, (item) => item.cart)
  @JoinColumn()
  items: CartItem[]

  @ManyToOne(() => User)
  user: User

  @Column({ default: true })
  isActive: boolean

  @CreateDateColumn()
  createdAt: Date
}

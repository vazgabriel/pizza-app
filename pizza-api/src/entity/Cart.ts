import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
  Index,
} from 'typeorm'

import { CartItem } from './CartItem'
import { User } from './User'

@Entity()
@Index(['isActive', 'userId'], { unique: true, where: 'cart."isActive" = TRUE' })
export class Cart {
  @PrimaryGeneratedColumn()
  id: number

  @OneToMany(() => CartItem, (item) => item.cart, { eager: true })
  @JoinColumn()
  items: CartItem[]

  @ManyToOne(() => User)
  user: User

  @Column({ type: 'integer' })
  userId: number

  @Column({ default: true })
  isActive: boolean

  @CreateDateColumn()
  createdAt: Date
}

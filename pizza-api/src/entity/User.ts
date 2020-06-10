import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  Index,
} from 'typeorm'
import bcrypt from 'bcrypt'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 50 })
  firstName: string

  @Column({ length: 100 })
  lastName: string

  @Column({ length: 150, unique: true })
  email: string

  @Column({ length: 255 })
  password: string

  @CreateDateColumn()
  createdAt: Date

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(password || this.password, salt)
  }

  async checkPassword(password: string) {
    return await bcrypt.compare(password, this.password)
  }
}

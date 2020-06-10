import { getRepository } from 'typeorm'
import { Request, Response } from 'express'
import isEmail from 'validator/lib/isEmail'

import { User } from '../../entity/User'
import { AuthService } from '../services/AuthService'

export class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body

    if (!isEmail(email) || !password || password.length < 6) {
      return res.status(400).json({ message: 'Invalid body' })
    }

    try {
      const user = await getRepository(User).findOneOrFail({ email })

      const validPassword = await user.checkPassword(password)

      if (validPassword) {
        return res.json(await AuthController.userToken(user))
      }

      return res.status(401).json({ message: 'Invalid email or password' })
    } catch (error) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }
  }

  static async register(req: Request, res: Response) {
    const { firstName, lastName, email, password } = req.body

    if (
      !firstName ||
      !lastName ||
      !isEmail(email) ||
      !password ||
      password.length < 6
    ) {
      return res.status(400).json({ message: 'Invalid body' })
    }

    const user = new User()
    user.firstName = firstName
    user.lastName = lastName
    user.email = email
    user.password = password

    try {
      await getRepository(User).save(user)
    } catch (error) {
      return res.status(422).json({ message: 'This email is already in use' })
    }

    return res.status(201).json(await AuthController.userToken(user))
  }

  static async renewToken(req: Request, res: Response) {
    const user = req.user!
    return res.json(await AuthController.userToken(user))
  }

  private static async userToken(user: User) {
    user.password = undefined // don't return password

    return {
      user,
      token: await AuthService.sign({ id: user.id }),
    }
  }
}

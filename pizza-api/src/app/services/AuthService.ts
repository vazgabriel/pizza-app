import jwt from 'jsonwebtoken'
import { getRepository } from 'typeorm'
import { Request, Response, NextFunction } from 'express'

import { User } from '../../entity/User'
import { appSettings } from '../../config'

export interface JWTPayload {
  id: number
}

export class AuthService {
  static async authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'] || ''

    if (!token) {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    try {
      const decoded = await AuthService.verify(token)
      const user = await getRepository(User).findOneOrFail(decoded.id)

      req.user = user
    } catch (error) {
      return res.status(403).json({ message: 'Unauthorized' })
    }

    next()
  }

  static verify(token: string): Promise<JWTPayload> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, appSettings.jwtSecret, (err, decoded) => {
        if (err) {
          return reject(err)
        }

        return resolve(decoded as JWTPayload)
      })
    })
  }

  static sign(payload: JWTPayload): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        appSettings.jwtSecret,
        { expiresIn: '14d' },
        (err, token) => {
          if (err) {
            return reject(err)
          }

          return resolve(token)
        }
      )
    })
  }
}

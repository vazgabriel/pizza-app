import { Request, Response } from 'express'
import { getRepository, FindConditions } from 'typeorm'

import { HOURLY } from '../constants'
import { Product } from '../../entity/Product'

export class ProductController {
  static async get(req: Request, res: Response) {
    const where: FindConditions<Product> = {}

    if (req.query.type) {
      where.type = req.query.type.toString()
    }

    try {
      const products = await getRepository(Product).find({
        where,
        cache: HOURLY,
      })
      return res.json(products)
    } catch (error) {
      return res.status(400).json({ message: 'Invalid type' })
    }
  }
}

import { Request, Response } from 'express'
import { getRepository, FindConditions } from 'typeorm'

import { Product } from '../../entity/Product'

export class ProductController {
  static async get(req: Request, res: Response) {
    const where: FindConditions<Product> = {}

    if (req.query.type) {
      where.type = req.query.type as string
    }

    return res.json(await getRepository(Product).find({ where }))
  }
}

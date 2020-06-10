import { Connection } from 'typeorm'
import { Seeder, Factory } from 'typeorm-seeding'

import { Product, ProductType } from '../entity/Product'

const products = [
  // Pizzas
  { name: 'Pepperoni', description: '', pictureUrl: '', price: 2000, type: ProductType.PIZZA },
  { name: 'Four Cheese', description: '', pictureUrl: '', price: 2000, type: ProductType.PIZZA },
  { name: 'Hawaiian', description: '', pictureUrl: '', price: 2000, type: ProductType.PIZZA },
  { name: 'Portuguese', description: '', pictureUrl: '', price: 2000, type: ProductType.PIZZA },
  { name: 'BBQ Chicken', description: '', pictureUrl: '', price: 2000, type: ProductType.PIZZA },
  { name: 'Corn and Bacon', description: '', pictureUrl: '', price: 2000, type: ProductType.PIZZA },
  { name: 'Parmesan Shrimp', description: '', pictureUrl: '', price: 2000, type: ProductType.PIZZA },
  { name: 'Favorite Veggie', description: '', pictureUrl: '', price: 2000, type: ProductType.PIZZA },
  // Drinks
  { name: 'Coke 500ml', description: '', pictureUrl: '', price: 250, type: ProductType.DRINK },
  { name: 'Coke 2L', description: '', pictureUrl: '', price: 500, type: ProductType.DRINK },
  { name: 'Coke Zero 2L', description: '', pictureUrl: '', price: 500, type: ProductType.DRINK },
  { name: 'Sprint 2L', description: '', pictureUrl: '', price: 400, type: ProductType.DRINK },
  { name: 'Dr Pepper 2L', description: '', pictureUrl: '', price: 450, type: ProductType.DRINK },
  { name: 'Water 500ml', description: '', pictureUrl: '', price: 200, type: ProductType.DRINK },
]

export default class CreateProducts implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Product)
      .values(products)
      .execute()
  }
}

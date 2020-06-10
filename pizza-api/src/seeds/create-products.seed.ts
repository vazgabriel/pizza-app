import { Connection } from 'typeorm'
import { Seeder, Factory } from 'typeorm-seeding'

import { Product, ProductType } from '../entity/Product'

const products = [
  // Pizzas
  {
    name: 'Pepperoni',
    description: 'A delicious Pepperoni pizza!',
    pictureUrl: 'https://cdn.pixabay.com/photo/2016/03/05/09/22/eat-1237431_1280.jpg',
    price: 2000,
    type: ProductType.PIZZA,
  },
  {
    name: 'Four Cheese',
    description: 'A delicious Four Cheese pizza!',
    pictureUrl: 'https://cdn.pixabay.com/photo/2020/05/24/18/20/pizza-5215500_1280.jpg',
    price: 2000,
    type: ProductType.PIZZA,
  },
  {
    name: 'Hawaiian',
    description: 'A delicious Hawaiian pizza!',
    pictureUrl: 'https://cdn.pixabay.com/photo/2016/04/14/19/56/pizza-hawaiian-1329621_1280.jpg',
    price: 2000,
    type: ProductType.PIZZA,
  },
  {
    name: 'Portuguese',
    description: 'A delicious Portuguese pizza!',
    pictureUrl: 'https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg',
    price: 2000,
    type: ProductType.PIZZA,
  },
  {
    name: 'House Favorite',
    description: 'A delicious House Favorite pizza!',
    pictureUrl: 'https://cdn.pixabay.com/photo/2015/02/01/05/20/supreme-pizza-619133_1280.png',
    price: 2000,
    type: ProductType.PIZZA,
  },
  {
    name: 'Bacon',
    description: 'A delicious Bacon pizza!',
    pictureUrl: 'https://cdn.pixabay.com/photo/2020/05/12/16/18/pizza-5163790_1280.jpg',
    price: 2000,
    type: ProductType.PIZZA,
  },
  {
    name: 'Parmesan Shrimp',
    description: 'A delicious Parmesan Shrimp pizza!',
    pictureUrl: 'https://cdn.pixabay.com/photo/2016/03/05/20/08/american-1238677_1280.jpg',
    price: 2000,
    type: ProductType.PIZZA,
  },
  {
    name: 'Favorite Veggie',
    description: 'A delicious Favorite Veggie pizza!',
    pictureUrl: 'https://cdn.pixabay.com/photo/2014/05/18/11/25/pizza-346985_1280.jpg',
    price: 2000,
    type: ProductType.PIZZA,
  },
  // Drinks
  {
    name: 'Coke 350ml',
    description: 'Drink Coke 350ml',
    pictureUrl: 'https://cdn.pixabay.com/photo/2014/09/26/19/51/coca-cola-462776_1280.jpg',
    price: 250,
    type: ProductType.DRINK,
  },
  {
    name: 'Coke Zero 330ml',
    description: 'Drink Coke Zero 330ml',
    pictureUrl: 'https://images.pexels.com/photos/3819969/pexels-photo-3819969.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    price: 250,
    type: ProductType.DRINK,
  },
  {
    name: 'Pepsi 350ml',
    description: 'Drink Pepsi 350ml',
    pictureUrl: 'https://images.pexels.com/photos/1292294/pexels-photo-1292294.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    price: 200,
    type: ProductType.DRINK,
  },
  {
    name: 'Water 500ml',
    description: 'Drink Water 500ml',
    pictureUrl: 'https://cdn.pixabay.com/photo/2012/03/01/00/31/water-19659_1280.jpg',
    price: 150,
    type: ProductType.DRINK,
  },
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

import Faker from 'faker'
import { define } from 'typeorm-seeding'

import { User } from '../entity/User'

define(User, (faker: typeof Faker) => {
  const user = new User()

  const gender = faker.random.number(1)

  user.firstName = faker.name.firstName(gender)
  user.lastName = faker.name.lastName(gender)
  user.email = `${user.firstName.toLowerCase()}_${user.lastName.toLowerCase()}@test.com`
  user.password = '123456'

  return user
})

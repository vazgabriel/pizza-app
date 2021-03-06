# Pizza APP

An app to order your favorite pizza in React + Node.js (using Typescript)

## Live Version

You can try the live version [here](https://pizza-app-vaz.web.app/). (Be aware that it can take a long time to load the first time, because the backend is on Heroku and may be in "sleep mode")

## What you need to have to run it locally?

[Node.js v12](https://nodejs.org/en/download/)

[Classic Yarn (v1)](https://classic.yarnpkg.com/en/docs/install)

[DockerCompose](https://docs.docker.com/compose/)

## Installing and Running

You will have a specific README.md in each of the folders that will explain how to run

## Deploying

### Frontend

```bash
cd pizza-web
yarn build
firebase deploy
```

### Backend

```bash
# Have all updates inside Git
git subtree push --prefix pizza-api heroku master
```

## Architecture

### Frontend

React.js, Typescript, Redux, Redux Saga, Chakra UI, Emotion UI, and Axios.

### Backend

Node.js (v12), Typescript, Express.js, TypeORM (Database), and Bcrypt (Password encrypting).

### Database

PostgreSQL

### Database Models

```ts
// User's email is an unique index
class User {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  createdAt: Date
}

// Product's name is an unique index
// Product's type is an index (for high performance searching)
class Product {
  id: number
  name: string
  description: string
  pictureUrl: string
  type: string
  price: number // All prices are based in Euro and without commas (Ex: €50.00 = 5000)
  createdAt: Date
}

// Cart have an index for [isActive, userId] being unique where isActive = true (An user can just have one cart at time)
class Cart {
  id: number
  userId: number
  isActive: boolean
  createdAt: Date
}

// CartItem have an unique index for [cartId, productId] (A cart cannot have the same product twice)
class CartItem {
  id: number
  cartId: number
  productId: number
  quantity: number
  comments: string // This would be to add comments for the product, e.g No onions, ...
  createdAt: Date
}

// Checkout's currency is an index (for high performance searching)
// Checkout's userId is an index (for high performance searching)
class Checkout {
  id: number
  address: string
  address_2: string // Optional complement
  foodPrice: number // Sum of cartItem.quantity * cartItem.product.price
  deliveryPrice: number
  totalPrice: number
  currency: string
  cartId: number
  userId: number
  createdAt: Date
}
```

## Next Steps

- Implement comments inside CartItem
- Implement a micro-service to calculate currencies (E.g current value for USD, BRL, ...)
- Implement a logic for delivery price (now we just send the same always)
- Implement a real-time system that updates whenever there's a new purchase, and control purchase status (Preparing, Sending, Done)

### Have fun :)

[Github](https://github.com/vazgabriel)

[LinkedIn](https://www.linkedin.com/in/gabrielcvaz)

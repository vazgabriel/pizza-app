import 'reflect-metadata'
import { createConnection } from 'typeorm'

import { app } from './server'
import { appSettings } from './config'

createConnection(appSettings.database)
  .then(async () => {
    app.listen(appSettings.port, () =>
      console.log(`API listening at PORT ${appSettings.port}`)
    )
  })
  .catch((error) => console.log(error))

/*
Let’s imagine you want to start a new pizza delivery business. Please create a small web application for online pizza
ordering. The idea is to make a non-existing service where assumed clients can choose a pizza, put it into a cart
and make an order.

 The menu page should contain at least 8 pizzas
 Login is not required but could be available for checking the history of orders
 Your clients should be able to choose pizzas directly from the menu
 You can decide what else you want in the menu
 Adding a description for each pizza would be a nice decision
 Don’t proceed to the payment page. The last action from a client will be filling in the order form (address,
name, surname, etc.) to get a confirmation that the order has been received
 A client should be able to put several pizzas into cart, and the quantity must be defined both while
outside the cart and in the cart
 Total price of each order must be calculated and shown in euros and in dollars
 Don’t forget to add delivery costs to the final bill
 */

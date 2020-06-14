import React, { useState } from 'react'
import { List, Heading } from '@chakra-ui/core'

import CartItem from '../CartItem'
import { Item } from '../../store/ducks/cart'

interface Props {
  items: Item[]
}

export default function CheckoutCart({ items }: Props) {
  const [toDeleteId, setToDeleteId] = useState(0)

  return (
    <List
      spacing={3}
      maxH='calc(100vh - 62px - 72px - 64px - 1rem)'
      overflowY='auto'
    >
      {items.length === 0 ? (
        <Heading as='h4' size='md' mb='1rem'>
          You don't have any products in the cart, try adding some
        </Heading>
      ) : (
        items.map((i) => (
          <CartItem
            key={i.productId}
            item={i}
            toDeleteId={toDeleteId}
            setToDeleteId={setToDeleteId}
          />
        ))
      )}
    </List>
  )
}

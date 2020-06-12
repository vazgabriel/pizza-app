import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { SimpleGrid } from '@chakra-ui/core'

import ProductItem from '../ProductItem'
import { AppState } from '../../store/ducks'

export default function Drinks() {
  const [toDeleteId, setToDeleteId] = useState(0)
  const { cart, products } = useSelector((state: AppState) => ({
    cart: state.cart,
    products: state.products.drinks,
  }))

  return (
    <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} padding='1em' spacing='32px'>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          toDeleteId={toDeleteId}
          setToDeleteId={setToDeleteId}
          itemCart={cart.items.find((c) => c.productId === product.id)}
        />
      ))}
    </SimpleGrid>
  )
}

import React, { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SimpleGrid, Box, Image, Button, Flex, Icon } from '@chakra-ui/core'

import { AppState } from '../store/ducks'
import { addItem, updateItem, removeItem } from '../store/ducks/cart'

export default function Home() {
  const dispatch = useDispatch()
  const { cart, products, USD } = useSelector((state: AppState) => ({
    cart: state.cart,
    products: state.products,
    USD: state.config.USD,
  }))

  const pizzasCartInfo = useMemo(
    () =>
      products.pizzas.map((p) => ({
        ...p,
        itemCart: cart.items.find((e) => e.productId === p.id),
      })),
    [products.pizzas, cart.items]
  )

  return (
    <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} padding='1em' spacing='16px'>
      {pizzasCartInfo.map((e, i) => (
        <Box key={e.id} shadow='md' rounded='lg'>
          <Box maxH='200px' d='flex'>
            <Image src={e.pictureUrl} alt={e.name} m='auto' maxH='200px' />
          </Box>
          <Box p='6'>
            <Box
              mt='1'
              fontWeight='semibold'
              as='h4'
              lineHeight='tight'
              isTruncated
            >
              {e.name}
            </Box>
            <Box>
              € {(e.price / 100).toFixed(2)}
              <Box as='span' color='gray.600' fontSize='sm'>
                &nbsp;- $ {((e.price * USD) / 100).toFixed(2)}
              </Box>
            </Box>
            <Box pt='16px'>
              {e.itemCart ? (
                <Flex>
                  <Button
                    variantColor='teal'
                    variant='link'
                    onClick={() => {
                      if (e.itemCart?.quantity === 1) {
                        dispatch(removeItem(e.id))
                      } else {
                        dispatch(
                          updateItem({
                            ...e.itemCart!,
                            quantity: e.itemCart!.quantity - 1,
                          })
                        )
                      }
                    }}
                  >
                    <Icon name='minus' />
                  </Button>
                  {e.itemCart.quantity}
                  <Button
                    variantColor='teal'
                    variant='link'
                    onClick={() =>
                      dispatch(
                        updateItem({
                          ...e.itemCart!,
                          quantity: e.itemCart!.quantity + 1,
                        })
                      )
                    }
                  >
                    <Icon name='add' />
                  </Button>
                </Flex>
              ) : (
                <Button
                  variantColor='teal'
                  variant='link'
                  onClick={() => dispatch(addItem(products.pizzas[i]))}
                >
                  Add to Cart
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  )
}

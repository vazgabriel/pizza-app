import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Image, Button, Flex, Icon } from '@chakra-ui/core'

import { AppState } from '../store/ducks'
import { Item } from '../store/ducks/cart'
import { Product } from '../store/ducks/products'
import RemoveProductDialog from './RemoveProductDialog'
import { addItem, updateItem, removeItem } from '../store/ducks/cart'

interface Props {
  product: Product
  toDeleteId: number
  setToDeleteId: React.Dispatch<React.SetStateAction<number>>
  itemCart?: Item
}

export default function ProductItem({
  product,
  toDeleteId,
  setToDeleteId,
  itemCart,
}: Props) {
  const dispatch = useDispatch()
  const USD = useSelector((state: AppState) => state.config.USD)

  const onClose = (remove?: boolean) => {
    if (remove) {
      dispatch(removeItem(toDeleteId))
    }
    setToDeleteId(0)
  }

  return (
    <Box shadow='lg' rounded='lg'>
      <Box maxH='200px' d='flex'>
        <Image
          src={product.pictureUrl}
          alt={product.name}
          m='auto'
          maxH='200px'
        />
      </Box>
      <Box p='6'>
        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          isTruncated
        >
          {product.name}
        </Box>
        <Box>
          € {(product.price / 100).toFixed(2)}
          <Box as='span' color='gray.600' fontSize='sm'>
            &nbsp;- $ {((product.price * USD) / 100).toFixed(2)}
          </Box>
        </Box>
        <Box pt='16px'>
          {itemCart ? (
            <Flex>
              <Button
                variantColor='teal'
                variant='link'
                onClick={() => {
                  if (itemCart?.quantity === 1) {
                    setToDeleteId(product.id)
                  } else {
                    dispatch(
                      updateItem({
                        ...itemCart!,
                        quantity: itemCart!.quantity - 1,
                      })
                    )
                  }
                }}
              >
                <Icon name='minus' />
              </Button>
              {itemCart.quantity}
              <Button
                variantColor='teal'
                variant='link'
                onClick={() =>
                  dispatch(
                    updateItem({
                      ...itemCart!,
                      quantity: itemCart!.quantity + 1,
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
              onClick={() => dispatch(addItem(product))}
            >
              Add to Cart
            </Button>
          )}
        </Box>
      </Box>
      <RemoveProductDialog
        productName={product.name}
        isOpen={toDeleteId === product.id}
        onClose={onClose}
      />
    </Box>
  )
}

import React, { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Image, Button, Flex, Icon, useToast } from '@chakra-ui/core'

import RemoveProductDialog from './RemoveProductDialog'

import { sagaMiddleware } from '../store'
import { AppState } from '../store/ducks'
import { removeItem } from '../store/sagas/cart'
import { Product } from '../store/ducks/products'
import { addItem, updateItem, Item } from '../store/ducks/cart'

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
  const toast = useToast()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const USD = useSelector((state: AppState) => state.config.USD)

  const onClose = (remove?: boolean) => {
    if (remove) {
      setLoading(true)
      sagaMiddleware.run<any>(removeItem, toDeleteId, (error?: string) => {
        if (error) {
          setLoading(false)
          toast({
            title: 'Error',
            description: error,
            status: 'error',
            duration: 6000,
          })
        }
      })
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
        <Flex pt='16px' justify='space-between'>
          <Box>
            {itemCart ? (
              <Flex>
                <Button
                  isDisabled={loading}
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
                  isDisabled={loading || itemCart.quantity > 4}
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
          {!!itemCart && (
            <Button
              variant='link'
              isLoading={loading}
              onClick={() => setToDeleteId(product.id)}
            >
              <Box as={FaTrashAlt} size='24px' color='red.500' />
            </Button>
          )}
        </Flex>
      </Box>
      <RemoveProductDialog
        productName={product.name}
        isOpen={toDeleteId === product.id}
        onClose={onClose}
      />
    </Box>
  )
}

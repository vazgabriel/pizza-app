import React, { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import {
  Avatar,
  Box,
  Button,
  Divider,
  Icon,
  Flex,
  Heading,
  ListItem,
  useToast,
} from '@chakra-ui/core'

import RemoveProductDialog from './RemoveProductDialog'

import { AppState } from '../store/ducks'
import { sagaMiddleware } from '../store'
import { removeItem } from '../store/sagas/cart'
import { updateItem, Item } from '../store/ducks/cart'

interface Props {
  item: Item
  toDeleteId: number
  setToDeleteId: React.Dispatch<React.SetStateAction<number>>
}

export default function CartItem({ item, toDeleteId, setToDeleteId }: Props) {
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

  const { product, quantity } = item

  return (
    <>
      <ListItem py='1rem'>
        <Flex align='center'>
          <Avatar size='lg' name={product.name} src={product.pictureUrl} />
          <Box ml='16px'>
            <Heading as='h4' size='lg'>
              {product.name}
            </Heading>
            <Heading as='span' size='sm'>
              € {(product.price / 100).toFixed(2)}
              <Box as='span' color='gray.600' fontSize='sm'>
                &nbsp;- $ {((product.price * USD) / 100).toFixed(2)}
              </Box>
            </Heading>
          </Box>
        </Flex>
        <Flex justify='space-between' pt='16px'>
          <Box>
            <Button
              isDisabled={loading}
              variantColor='teal'
              variant='link'
              onClick={() => {
                if (quantity === 1) {
                  setToDeleteId(product.id)
                } else {
                  dispatch(
                    updateItem({
                      ...item,
                      quantity: quantity - 1,
                    })
                  )
                }
              }}
            >
              <Icon name='minus' />
            </Button>
            {quantity}
            <Button
              variantColor='teal'
              variant='link'
              isDisabled={loading || quantity > 4}
              onClick={() =>
                dispatch(
                  updateItem({
                    ...item,
                    quantity: quantity + 1,
                  })
                )
              }
            >
              <Icon name='add' />
            </Button>
          </Box>
          <Button
            variant='link'
            isLoading={loading}
            onClick={() => setToDeleteId(product.id)}
          >
            <Box as={FaTrashAlt} size='24px' color='red.500' />
          </Button>
        </Flex>
      </ListItem>
      <Divider />
      <RemoveProductDialog
        productName={product.name}
        isOpen={toDeleteId === product.id}
        onClose={onClose}
      />
    </>
  )
}

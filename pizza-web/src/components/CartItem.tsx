import React from 'react'
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
} from '@chakra-ui/core'

import { AppState } from '../store/ducks'
import { Item } from '../store/ducks/cart'
import RemoveProductDialog from './RemoveProductDialog'
import { updateItem, removeItem } from '../store/ducks/cart'

interface Props {
  item: Item
  toDeleteId: number
  setToDeleteId: React.Dispatch<React.SetStateAction<number>>
}

export default function CartItem({ item, toDeleteId, setToDeleteId }: Props) {
  const dispatch = useDispatch()
  const USD = useSelector((state: AppState) => state.config.USD)

  const onClose = (remove?: boolean) => {
    if (remove) {
      dispatch(removeItem(toDeleteId))
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
              isDisabled={quantity > 4}
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
          <Button variant='link' onClick={() => setToDeleteId(product.id)}>
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

import React, { useMemo, useState } from 'react'
import {
  Box,
  Flex,
  List,
  Button,
  Drawer,
  Heading,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/core'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import CartItem from './CartItem'
import { AppState } from '../store/ducks'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: Props) {
  const history = useHistory()
  const [toDeleteId, setToDeleteId] = useState(0)
  const { cart, USD } = useSelector((state: AppState) => ({
    cart: state.cart,
    USD: state.config.USD,
  }))

  const onCheckout = () => {
    onClose()
    history.push('/checkout')
  }

  const { total, totalUSD } = useMemo(() => {
    const total = cart.items.reduce(
      (a, c) => a + c.product.price * c.quantity,
      0
    )

    return { total, totalUSD: total * USD }
  }, [cart.items, USD])

  return (
    <Drawer placement='right' isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Your cart details</DrawerHeader>

        <DrawerBody>
          <Flex flexDir='column' justify='space-between' h='100%'>
            {cart.items.length === 0 && (
              <Heading as='p' size='sm' color='gray.700'>
                You don't have any products in the cart, try adding some
              </Heading>
            )}
            {/* 100vh = all screen, 62px = header, 72px = footer, 66px = prices, 1rem paddings */}
            <List
              spacing={3}
              maxH='calc(100vh - 62px - 72px - 64px - 1rem)'
              overflowY='auto'
            >
              {cart.items.map((i) => (
                <CartItem
                  key={i.productId}
                  item={i}
                  toDeleteId={toDeleteId}
                  setToDeleteId={setToDeleteId}
                />
              ))}
            </List>
            <Box py='8px'>
              <Heading as='h3' size='md' textAlign='end'>
                € {(total / 100).toFixed(2)}
              </Heading>
              <Heading as='h3' size='md' textAlign='end' color='gray.600'>
                $ {(totalUSD / 100).toFixed(2)}
              </Heading>
            </Box>
          </Flex>
        </DrawerBody>

        <DrawerFooter>
          <Button variant='outline' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button color='teal' onClick={onCheckout}>
            Checkout
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

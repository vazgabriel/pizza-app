import React from 'react'
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/core'
import { useHistory } from 'react-router-dom'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: Props) {
  const history = useHistory()

  const onCheckout = () => {
    onClose()
    history.push('/checkout')
  }

  return (
    <Drawer placement='right' isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Your cart details</DrawerHeader>

        <DrawerBody>
          <h2>Hello world</h2>
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

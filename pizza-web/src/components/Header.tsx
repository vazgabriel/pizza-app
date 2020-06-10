import React from 'react'
import { Box, Flex, Heading, useDisclosure } from '@chakra-ui/core'
import { FaShoppingCart } from 'react-icons/fa'

import CartDrawer from './CartDrawer'

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Flex
        as='nav'
        bg='gray.700'
        shadow='md'
        color='white'
        padding='1.5rem'
        align='center'
        justify='space-between'
      >
        <Flex align='center' mr={5}>
          <Heading as='h1' size='lg'>
            Awesome Pizza
          </Heading>
        </Flex>

        <Box
          as={FaShoppingCart}
          aria-label='Cart'
          size='28px'
          cursor='pointer'
          onClick={onOpen}
        />
      </Flex>
      <CartDrawer isOpen={isOpen} onClose={onClose} />
    </>
  )
}

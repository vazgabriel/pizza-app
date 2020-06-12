import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import { Box, Flex, Heading, useDisclosure } from '@chakra-ui/core'

import CartDrawer from './CartDrawer'
import { AppState } from '../store/ducks'

export default function Header() {
  const items = useSelector((state: AppState) =>
    state.cart.items.reduce((a, c) => a + c.quantity, 0)
  )
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Flex
        as='nav'
        align='center'
        bg='gray.700'
        color='white'
        justify='space-between'
        padding='1.5rem'
        shadow='md'
        position='fixed'
        w='100%'
        zIndex={1}
      >
        <Flex align='center' mr={5}>
          <Link to='/'>
            <Heading as='h1' size='lg' cursor='pointer'>
              Awesome Pizza
            </Heading>
          </Link>
        </Flex>

        <Box position='relative'>
          <Box
            as={FaShoppingCart}
            aria-label='Cart'
            size='28px'
            cursor='pointer'
            onClick={onOpen}
          />
          <Flex
            align='center'
            justify='center'
            backgroundColor='blue.500'
            color='gray.100'
            borderRadius='100%'
            position='absolute'
            p='8px'
            h='22px'
            w='22px'
            top='0px'
            right='-12px'
            fontSize={items > 99 ? '10px' : '12px'}
            lineHeight='22px'
          >
            {items > 0 && (items > 99 ? '+99' : items)}
          </Flex>
        </Box>
      </Flex>
      <CartDrawer isOpen={isOpen} onClose={onClose} />
    </>
  )
}

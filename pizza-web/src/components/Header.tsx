import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import {
  Box,
  Flex,
  Heading,
  useDisclosure,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
} from '@chakra-ui/core'

import CartDrawer from './CartDrawer'
import { AppState } from '../store/ducks'
import { logout } from '../store/ducks/user'

export default function Header() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { items, user } = useSelector((state: AppState) => ({
    items: state.cart.items.reduce((a, c) => a + c.quantity, 0),
    user: state.user,
  }))
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

        <Stack isInline spacing={8}>
          <Box position='relative'>
            <Box
              as={FaShoppingCart}
              aria-label='Cart'
              size='28px'
              cursor='pointer'
              onClick={onOpen}
            />
            {items > 0 && (
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
                {items > 99 ? '+99' : items}
              </Flex>
            )}
          </Box>
          {!!user.token && (
            <Menu>
              <MenuButton as={Box}>
                <Box
                  as={FaUser}
                  aria-label='Profile'
                  cursor='pointer'
                  size='28px'
                />
              </MenuButton>
              <MenuList>
                <MenuGroup
                  color='black'
                  title={`Welcome ${user.user?.firstName}`}
                >
                  <MenuItem
                    color='gray.800'
                    onClick={() => history.push('/order-history')}
                  >
                    Order History
                  </MenuItem>
                  <MenuItem color='gray.800' onClick={() => dispatch(logout())}>
                    Logout
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          )}
        </Stack>
      </Flex>
      <CartDrawer isOpen={isOpen} onClose={onClose} />
    </>
  )
}

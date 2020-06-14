import moment from 'moment'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Box,
  Stack,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Divider,
} from '@chakra-ui/core'

import { AppState } from '../store/ducks'
import { PurchaseHistory } from '../store/ducks/purchaseHistory'

export default function OrderHistory() {
  const purchaseHistory = useSelector(
    (state: AppState) => state.purchaseHistory
  )
  const [selected, setSelected] = useState<PurchaseHistory>()

  const getSign = (currency: string) => (currency === 'EUR' ? '€' : '$')

  return (
    <>
      <Box p='1em'>
        {purchaseHistory.length === 0 && (
          <Heading textAlign='center' size='md'>
            You never purchased anything
          </Heading>
        )}
        <Stack spacing={8}>
          {purchaseHistory.map((p) => (
            <Box key={p.id} p='1rem' shadow='md'>
              <Heading size='md'>
                {p.address}
                {!!p.address_2 ? `, ${p.address_2}` : ''} -{' '}
                <Heading as='small' size='sm' color='gray.600'>
                  {moment(p.createdAt).format('YYYY[-]MM[-]DD')}
                </Heading>
              </Heading>
              <Heading size='sm' color='gray.800'>
                {getSign(p.currency)} {(p.totalPrice / 100).toFixed(2)}
              </Heading>
              <Button variant='link' onClick={() => setSelected(p)}>
                Details
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
      <Modal isOpen={!!selected} onClose={() => setSelected(undefined)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{moment(selected?.createdAt).format('LLL')}</ModalHeader>
          <ModalCloseButton />

          {!!selected && (
            <ModalBody>
              <Heading as='h4' size='sm' color='gray.800'>
                Address: {selected.address}
                {!!selected.address_2 ? `, ${selected.address_2}` : ''}
              </Heading>
              <Divider />
              {selected.cart.items.map((i) => (
                <Heading key={i.id} size='md'>
                  {i.quantity}x {i.product.name}
                </Heading>
              ))}
              <Divider />
              <Heading as='h4' size='xs' color='gray.800'>
                SubTotal: {getSign(selected.currency)}{' '}
                {(selected.foodPrice / 100).toFixed(2)}
              </Heading>
              <Heading as='h4' size='xs' color='gray.800'>
                Delivery: {getSign(selected.currency)}{' '}
                {(selected.deliveryPrice / 100).toFixed(2)}
              </Heading>
              <Heading as='h4' size='md' color='gray.800'>
                Total: {getSign(selected.currency)}{' '}
                {(selected.totalPrice / 100).toFixed(2)}
              </Heading>
            </ModalBody>
          )}

          <ModalFooter>
            <Button
              variantColor='blue'
              mr={3}
              onClick={() => setSelected(undefined)}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

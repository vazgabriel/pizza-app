import React from 'react'
import { Heading, Select, Stack, Divider } from '@chakra-ui/core'

import { CheckoutForm } from '../CheckoutSteps'

interface Props {
  form: CheckoutForm
  setForm: React.Dispatch<React.SetStateAction<CheckoutForm>>
  foodPrice: number
  delivery: number
}

export default function CheckoutConfirm({
  form,
  setForm,
  foodPrice,
  delivery,
}: Props) {
  const sign = form.currency === 'EUR' ? '€' : '$'

  return (
    <>
      <Heading as='h3' size='md' textAlign='center'>
        Confirm that everything is correct, and complete the purchase
      </Heading>
      <Stack spacing={4} py='1rem'>
        <label>Currency</label>
        <Select
          value={form.currency}
          onChange={(e) => setForm({ ...form, currency: e.target.value })}
        >
          <option value='EUR'>EUR</option>
          <option value='USD'>USD</option>
        </Select>
        <Heading as='h6' size='sm'>
          Address: {form.address}
        </Heading>
        {!!form.address_2 && (
          <Heading as='h6' size='sm'>
            Address 2: {form.address_2}
          </Heading>
        )}
        <Divider />
        <Heading as='h6' size='xs' color='gray.700'>
          Subtotal Products: {sign} {(foodPrice / 100).toFixed(2)}
        </Heading>
        <Heading as='h6' size='xs' color='gray.700'>
          Delivery: {sign} {(delivery / 100).toFixed(2)}
        </Heading>
        <Heading as='h6' size='sm'>
          Total: {sign} {((foodPrice + delivery) / 100).toFixed(2)}
        </Heading>
      </Stack>
    </>
  )
}

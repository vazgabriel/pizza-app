import React from 'react'
import { Heading, Input, Stack } from '@chakra-ui/core'

import { CheckoutForm } from '../CheckoutSteps'

interface Props {
  form: CheckoutForm
  setForm: React.Dispatch<React.SetStateAction<CheckoutForm>>
}

export default function CheckoutAddress({ form, setForm }: Props) {
  // address
  // address_2
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    setForm({ ...form, [id]: value })
  }

  return (
    <>
      <Heading as='h3' size='md' textAlign='center'>
        Please provide the Delivery Address
      </Heading>
      <Stack spacing={4} py='1rem'>
        <Input
          id='address'
          name='address'
          placeholder='Address'
          value={form.address}
          onChange={onChange}
          maxLength={100}
          isRequired
          autoComplete='address'
        />
        <Input
          id='address_2'
          name='address_2'
          placeholder='Address 2'
          value={form.address_2}
          onChange={onChange}
          maxLength={50}
          autoComplete='address_2'
        />
      </Stack>
    </>
  )
}

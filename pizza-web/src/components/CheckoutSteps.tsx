import React, { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Flex, Box, Stack, Button, useToast } from '@chakra-ui/core'

import { AppState } from '../store/ducks'
import { sagaMiddleware } from '../store'
import CheckoutCart from './checkout/CheckoutCart'
import CheckoutAddress from './checkout/CheckoutAddress'
import CheckoutConfirm from './checkout/CheckoutConfirm'
import { completePurchase, deliveryPrice } from '../store/sagas/checkout'

enum Steps {
  CART,
  ADDRESS,
  CONFIRM,
}

export interface CheckoutForm {
  address: string
  address_2: string
  currency: string
}

export default function CheckoutSteps() {
  const toast = useToast()
  const history = useHistory()
  const [form, setForm] = useState<CheckoutForm>({
    address: '',
    address_2: '',
    currency: 'EUR',
  })
  const [delivery, setDelivery] = useState(0)
  const [step, setStep] = useState(Steps.CART)
  const [isLoading, setIsLoading] = useState(false)
  const { items, USD } = useSelector((state: AppState) => ({
    items: state.cart.items,
    USD: state.config.USD,
  }))

  const foodPrice = useMemo(() => {
    const foodPrice = items.reduce(
      (a, c) => a + c.product.price * c.quantity,
      0
    )

    return form.currency === 'EUR' ? foodPrice : foodPrice * USD
  }, [items, form.currency, USD])

  const totalDelivery = useMemo(() => {
    return form.currency === 'EUR' ? delivery : delivery * USD
  }, [form.currency, delivery, USD])

  const getDeliveryPrice = async () => {
    setIsLoading(true)

    sagaMiddleware.run(
      deliveryPrice,
      form.address,
      (error?: string, price?: number) => {
        setIsLoading(false)

        if (error) {
          toast({
            title: 'Error',
            description: error,
            status: 'error',
            duration: 6000,
          })
        } else {
          setDelivery(price!)
          setStep(Steps.CONFIRM)
        }
      }
    )
  }

  const confirmPurchase = async () => {
    setIsLoading(true)

    const { address, address_2, currency } = form

    sagaMiddleware.run<any>(
      completePurchase,
      { address, address_2, foodPrice, deliveryPrice: totalDelivery, currency },
      (error?: string) => {
        setIsLoading(false)

        if (error) {
          toast({
            title: 'Error',
            description: error,
            status: 'error',
            duration: 6000,
          })
          return
        }

        toast({
          title: 'Success',
          description: 'Purchase successfully completed',
          status: 'success',
          duration: 6000,
        })
        history.push('/')
      }
    )
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (step === Steps.CART) {
      if (items.length > 0) {
        setStep(Steps.ADDRESS)
      }
      // If there's no items, do nothing
    } else if (step === Steps.ADDRESS) {
      if (!!form.address) {
        getDeliveryPrice()
      } else {
        toast({
          title: 'Error',
          description: 'Please provide an address',
          status: 'error',
          duration: 6000,
        })
      }
    } else if (step === Steps.CONFIRM) {
      confirmPurchase()
    }
  }

  return (
    <Flex p='1em' align='center' justify='center'>
      <Box w='90%' maxW='600px' p='1em' shadow='lg'>
        <form onSubmit={onSubmit}>
          <Stack spacing={4}>
            {step === Steps.CART ? (
              <CheckoutCart items={items} />
            ) : step === Steps.ADDRESS ? (
              <CheckoutAddress form={form} setForm={setForm} />
            ) : (
              <CheckoutConfirm
                form={form}
                setForm={setForm}
                delivery={totalDelivery}
                foodPrice={foodPrice}
              />
            )}
            <Button
              type='submit'
              variant='solid'
              variantColor='blue'
              isLoading={isLoading}
              isDisabled={items.length === 0}
            >
              {step === Steps.CONFIRM ? 'Complete Purchase' : 'Next'}
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  )
}

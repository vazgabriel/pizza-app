import React, { useState } from 'react'
import isEmail from 'validator/lib/isEmail'
import {
  Flex,
  Box,
  Heading,
  Stack,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  InputRightElement,
  Button,
  useToast,
} from '@chakra-ui/core'

import { sagaMiddleware } from '../store'
import { loginUser, registerUser } from '../store/sagas/user'

export default function Auth() {
  const toast = useToast()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    setForm({ ...form, [id]: value })
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isLoading) return

    const { firstName, lastName, email, password } = form

    const isEmailValid = isEmail(email)
    const isPasswordValid = password.length > 5
    const isRegisterValid = isLogin ? true : !!firstName && !!lastName

    if (!isEmailValid || !isPasswordValid || !isRegisterValid) {
      toast({
        title: 'Error',
        description: `Please write ${
          !isLogin ? 'a first and last name, ' : ''
        }a valid email, and a password with 6 characters or more`,
        status: 'error',
        duration: 4000,
      })
      return
    }

    setIsLoading(true)

    const body = {
      email,
      password,
      firstName,
      lastName,
    }

    let action = registerUser

    if (isLogin) {
      delete body.firstName
      delete body.lastName

      action = loginUser
    }

    sagaMiddleware.run(action, body, (error) => {
      if (error) {
        setIsLoading(false)
        toast({
          title: 'Error',
          description: error,
          status: 'error',
          duration: 6000,
        })
      }
    })
  }

  return (
    <Flex p='1em' align='center' justify='center'>
      <Box w='90%' maxW='600px' p='1em' shadow='lg'>
        <form onSubmit={onSubmit}>
          <Heading as='h3' size='md' textAlign='center'>
            Please login or create an account
          </Heading>
          <Heading
            as='p'
            size='xs'
            color='gray.600'
            textAlign='center'
            mt='.5rem'
            mb='1rem'
          >
            We ask you it, so that it is easier to contact you, if necessary,
            and you will also have access to an order history
          </Heading>
          <Stack spacing={4}>
            {!isLogin && (
              <Stack isInline spacing={4} align='center'>
                <InputGroup w='100%'>
                  <Input
                    id='firstName'
                    name='firstName'
                    placeholder='First Name'
                    value={form.firstName}
                    onChange={onChange}
                    maxLength={50}
                    isRequired
                    autoComplete='first-name'
                  />
                </InputGroup>
                <InputGroup w='100%'>
                  <Input
                    id='lastName'
                    name='lastName'
                    placeholder='Last Name'
                    value={form.lastName}
                    onChange={onChange}
                    maxLength={100}
                    isRequired
                    autoComplete='last-name'
                  />
                </InputGroup>
              </Stack>
            )}

            <InputGroup>
              <InputLeftElement children={<Icon name='email' />} />
              <Input
                id='email'
                name='email'
                type='email'
                placeholder='Email'
                value={form.email}
                onChange={onChange}
                maxLength={150}
                isRequired
                autoComplete='email'
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement children={<Icon name='lock' />} />
              <Input
                id='password'
                minLength={6}
                name='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                value={form.password}
                onChange={onChange}
                isRequired
                autoComplete='current-password'
              />
              <InputRightElement width='4.5rem'>
                <Button
                  size='sm'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>

            <Button
              type='submit'
              variant='solid'
              variantColor='blue'
              isLoading={isLoading}
            >
              {isLogin ? 'Login' : 'Register'}
            </Button>

            <Button
              type='button'
              variant='link'
              onClick={() => setIsLogin(!isLogin)}
              isDisabled={isLoading}
            >
              {isLogin ? 'Create an account' : 'I already have an account'}
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  )
}

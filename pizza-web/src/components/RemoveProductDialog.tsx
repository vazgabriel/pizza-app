import React, { useRef } from 'react'
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  Button,
} from '@chakra-ui/core'

interface Props {
  isOpen: boolean
  productName: string
  onClose: (remove?: boolean) => void
}

export default function RemoveProductDialog({
  isOpen,
  productName,
  onClose,
}: Props) {
  const cancelRef = useRef(null)

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={() => onClose(false)}
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
          Attention
        </AlertDialogHeader>

        <AlertDialogBody>
          Are you sure you want to remove the {productName} from your cart?
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={() => onClose(false)}>
            No
          </Button>
          <Button variantColor='red' onClick={() => onClose(true)} ml={3}>
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

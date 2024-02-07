import { Alert, AlertIcon,HStack } from '@chakra-ui/react'
import React from 'react'

function Error({message}) {
  return (
    <HStack w={'100%'} justifyContent={'center'} >
    <Alert 
    status='error' 
    h={'20vh'}
    my={'20'}
    w={'60%'}
    >
    <AlertIcon/>
    {message}
    </Alert>
   </HStack>
  )
}

export default Error
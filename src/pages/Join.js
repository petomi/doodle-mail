import React from 'react'
import { Center } from '@chakra-ui/react'
import JoinForm from '../features/rooms/JoinForm'

export default function Join (props) {
  return (
    <Center minHeight={['600px', '800px']}>
      <JoinForm />
    </Center>
  )
}

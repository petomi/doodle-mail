import React from 'react'
import { Center } from '@chakra-ui/react'
import Canvas from '../features/draw/Canvas'

export default function Join (props) {
  return (
      <Center w="100%" minHeight={['600px', '800px']} alignItems="center">
        <Canvas />
      </Center>
  )
}

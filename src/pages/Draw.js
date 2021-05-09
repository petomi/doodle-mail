import React from 'react'
import { Center } from '@chakra-ui/react'
import Canvas from '../features/draw/Canvas'

export default function Join (props) {
  return (
      <Center bg="gray.600" w="100%" minHeight={["100%"]} alignItems="center">
        <Canvas />
      </Center>
  )
}

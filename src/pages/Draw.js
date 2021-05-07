import React from 'react'
import styles from '../styles.js'
import { Center } from '@chakra-ui/react'
import Canvas from '../features/draw/Canvas'

export default function Join (props) {
  return (
    <Center bg="green.500" style={styles.pageBackground}>
      <Canvas />
    </Center>
  )
}

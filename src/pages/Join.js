import React from 'react'
import styles from '../styles.js'
import { Center } from '@chakra-ui/react'
import JoinForm from '../features/rooms/JoinForm'

export default function Join (props) {
  return (
    <Center bg="#6200EE" style={styles.pageBackground}>
      <JoinForm />
    </Center>
  )
}

import React from 'react'
import styles from '../styles.js'
import { Center } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

export default function Room (props) {
  const roomCode = useSelector((state) => state.room.roomCode)
  // const room = useSelector((state) => state.room.roomData)
  return (
    <Center bg="orange.500" style={styles.pageBackground}>
      Room Code: {roomCode}
      {/* TODO: write out messages here */}
    </Center>
  )
}

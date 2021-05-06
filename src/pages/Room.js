import React from 'react'
import styles from '../styles.js'
import { Center, Stack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

export default function Room (props) {
  const roomCode = useSelector((state) => state.room.roomCode)
  // const room = useSelector((state) => state.room.roomData)
  return (
    <Center bg="orange.500" style={styles.pageBackground}>
      Room Code: {roomCode}
      {/* TODO: write out messages here */}
      <Stack spacing={8}>
        <Feature
          title="Plan Money"
          desc="The future can be even brighter but a goal without a plan is just a wish"
        />
        <Feature
          title="Save Money"
          desc="You deserve good things. With a whooping 10-15% interest rate per annum, grow your savings on your own terms with our completely automated process"
        />
      </Stack>
    </Center>
  )
}

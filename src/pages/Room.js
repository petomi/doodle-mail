import React from 'react'
import styles from '../styles.js'
import { Box, Center, Heading, Stack, Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

export default function Room (props) {
  const roomCode = useSelector((state) => state.room.roomCode)
  const roomData = useSelector((state) => state.room.roomData)
  // const room = useSelector((state) => state.room.roomData)
  return (
    <Center bg="orange.500" style={styles.pageBackground}>
      {/* TODO: add message button */}
      <Stack spacing={8}>
        <Heading>Room Code: {roomCode}</Heading>
        {/* TODO: add scroll bar */}
        <MessageRepeater messages={roomData.messages} />
      </Stack>
    </Center>
  )
}

const MessageRepeater = ({ messages }) => {
  return messages.map((message, index) => {
    return(
    <Box p={5} shadow="md" borderWidth="1px">
      <Text>{message.author} - {message.date}</Text>
      <hr/>
      <Text>title: {message.title}</Text>
    </Box>
    )
  })
}

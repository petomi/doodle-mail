import React from 'react'
import styles from '../styles.js'
import NavButton from '../features/navigation/NavButton'
import { Box, Center, Heading, Stack, Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

export default function Room (props) {
  const roomCode = useSelector((state) => state.room.roomCode)
  const roomData = useSelector((state) => state.room.roomData)
  // const room = useSelector((state) => state.room.roomData)
  return (
    <Center bg="orange.500" style={styles.pageBackground}>
      <Stack spacing={8}>
      <NavButton to="/draw" colorScheme="blue">New Message</NavButton>
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
    <Box key={index} p={5} shadow="md" borderWidth="1px">
      {/* TODO: add viewing drawing and decompression using lzstring, see: https://pieroxy.net/blog/pages/lz-string/guide.html */}
      <Text>{message.author} - {message.date}</Text>
      <hr/>
      <Text>title: {message.title}</Text>
    </Box>
    )
  })
}

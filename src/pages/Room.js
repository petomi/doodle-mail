import React from 'react'
import NavButton from '../features/navigation/NavButton'
import DoodleCard from '../features/rooms/DoodleCard'
import { Center, Heading, Stack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'


export default function Room () {
  const roomCode = useSelector((state) => state.room.roomCode)
  const roomData = useSelector((state) => state.room.roomData)
  return (
    <Center minHeight={['400px', '800px']}>
      <Stack spacing={8} padding={[3, 0]}>
      <NavButton to="/draw" colorScheme="blue">New Message</NavButton>
        <Heading>Room Code: {roomCode}</Heading>
        <MessageRepeater messages={roomData.messages} />
      </Stack>
    </Center>
  )
}

const MessageRepeater = ({ messages }) => {
  /* TODO: add pagination */
  return messages.map((message, index) => {
    return (
      <DoodleCard message={message} key={index} />
    )
  })
}

import React from 'react'
import NavButton from '../features/navigation/NavButton'
import DoodleCard from '../features/rooms/DoodleCard'
import { Center, Flex, Heading, Spacer, Stack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'


export default function Room () {
  const roomCode = useSelector((state) => state.room.roomCode)
  const roomData = useSelector((state) => state.room.roomData)
  if (roomCode != null) {
    return (
      <Center minHeight={['400px', '800px']}>
        <Stack spacing={8} padding={[3, 0]} w={['100%', '800px']}>
          {/* TODO: use a websocket connection to join, leave, and send data to/from the room */}
        <Flex>
          <Heading fontSize={['lg', 'xl']} margin="auto">Room Code: {roomCode}</Heading>
          <Spacer/>
          <NavButton to="/draw" colorScheme="blue">New Message</NavButton>
        </Flex>
        { !!roomData.messages && <MessageRepeater messages={roomData.messages} /> }
        </Stack>
      </Center>
    )
  } else {
    return (
      <Center minHeight={['400px', '800px']}>
        <Heading>Room does not exist.</Heading>
      </Center>
    )
  }

}

const MessageRepeater = ({ messages }) => {
  /* TODO: add pagination */
  return messages.map((message, index) => {
    return (
      <DoodleCard message={message} key={index} />
    )
  })
}

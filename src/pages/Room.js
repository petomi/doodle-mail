import React, { useEffect } from 'react'
import { useDispatch } from "react-redux"
import NavButton from '../features/navigation/NavButton'
import DoodleCard from '../features/rooms/DoodleCard'
import { setRoomCode, setRoomData, updateRoomMessages } from '../features/rooms/roomSlice'
import { Center, Flex, Heading, Spacer, Stack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import socket from '../features/websocket/socket'

export default function Room () {
  const roomCode = useSelector((state) => state.room.roomCode)
  const roomData = useSelector((state) => state.room.roomData)
  const dispatch = useDispatch()

  useEffect(() => {
    // web socket event handlers
    socket.on('room', (room) => {
      ('room data updated')
      const roomData = room.room
      const roomCode = roomData.entryCode
      dispatch(setRoomCode(roomCode))
      dispatch(setRoomData(roomData))
    })

    socket.on('messages', (messages) => {
      dispatch(updateRoomMessages(messages.messages))
    })

    socket.on('user:joined', (data) => {
      // TODO: - set an alert/toast?
      console.log(data.message)
    })

    socket.on('user:left', (data) => {
      // TODO: - set an alert/toast?
      console.log(data.message)
    })

    return function cleanupListeners () {
      socket.off('room')
      socket.off('messages')
      socket.off('user:joined')
      socket.off('user:left')
    }
  })


  // render function
  if (roomCode != null) {
    return (
      <Center minHeight={['400px', '800px']}>
        <Stack spacing={8} padding={[3, 0]} w={['100%', '800px']} style={{ paddingTop: '16px' }}>
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
  /* TODO add pagination */
  return messages.map((message, index) => {
    return (
      <DoodleCard message={message} key={index} />
    )
  })
}

import React, { useEffect, useState } from "react"
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Stack, Link } from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa'
import { useInput } from '../../hooks/useInput'
import { useDispatch } from "react-redux"
import { createRoom, joinRoom, setRoomCode, setRoomData, setUserName } from './roomSlice'
import { success, error } from '../alerts/alertSlice'
import { useHistory } from "react-router-dom"
import socket from '../websocket/socket'

const JoinForm = () => {
  const { value:name, bind:bindName, reset:resetName } = useInput('')
  const { value:requestedRoom, bind:bindRoom, reset:resetRoom } = useInput('')
  const [formStage, setFormStage] = useState(1)
  const [textFieldFocused, setTextFieldFocused] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    // web socket event handlers
    socket.on('room:create', (room) => {
      const roomData = room.room
      const roomCode = roomData.entryCode
      dispatch(setRoomCode(roomCode))
      dispatch(setRoomData(roomData))
      dispatch(success(`Created room! Join with code: ${roomData.entryCode}`))
      history.push('/room')
    })

    socket.on('room:join', (room) => {
      const roomData = room.room
      const roomCode = roomData.entryCode
      dispatch(setRoomCode(roomCode))
      dispatch(setRoomData(roomData))
      dispatch(success(`Joined room with room code ${roomData.entryCode}`))
      history.push('/room')
    })

    socket.on('connect_error', (err) => {
      if (err.message === 'invalid username') {
        console.log('Invalid username selected. User already exists in room.')
        dispatch(error(`Invalid username selected. User may already exist in room.`))
      }
      resetName()
      resetRoom()
      setFormStage(1)
    });

    socket.on('error', (err) => {
      if (requestedRoom === '') {
        dispatch(error(`Failed to create room!`))
      } else {
        dispatch(error(`Failed to join room. Check your room code!`))
      }
      resetName()
      resetRoom()
      setFormStage(1)
    })

    return function cleanupListeners () {
      socket.off('room:create')
      socket.off('connect_error')
      socket.off('room:join')
      socket.off('error')
    }
  })


  // handle submitting form
  const handleSubmit = (evt) => {
    // TODO: save room name + userName in local storage and retrieve it from there on app load (if present)
    evt.preventDefault()
    dispatch(setUserName({userName: name}))
    // if room is blank,  create one
    if (requestedRoom === '') {
      dispatch(createRoom({userName: name}))
    } else {
      dispatch(joinRoom({ roomCode: requestedRoom, userName: name }))
    }
  }

  const goToPrevStage = () => {
    setFormStage(1)
  }

  const goToNextStage = () => {
    setFormStage(2)
  }

  if (formStage === 1) {
    return (
      <Stack w='400px' spacing={16} padding={[3, 0]}>
        <FormControl id="room-code">
          <FormLabel textAlign="center" fontSize="4xl" color="white">Have a room code?</FormLabel>
          <InputGroup size="lg">
            <Input
              type="text"
              variant="filled"
              className="form-field"
              placeholder="room code"
              onFocus={() => setTextFieldFocused(!textFieldFocused)}
              onBlur={() => setTextFieldFocused(!textFieldFocused)}
              style={{ color: textFieldFocused ? 'white' : 'black' }}
              onKeyPress={(e) => { if (e.key === 'Enter') goToNextStage(e) }}
              {...bindRoom}
            />
            <InputRightElement>
              <Button background="transparent" onClick={goToNextStage}>
                <FaArrowRight color={textFieldFocused? 'white' : 'black'}/>
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button color="black" alignSelf="center" width="60%" onClick={goToNextStage}>
          Create New Room
        </Button>
      </Stack>
    )
  }
  if (formStage === 2) {
    return (
      <Stack w='400px' spacing={16} padding={[3, 0]}>
        <FormControl id="name">
          <FormLabel textAlign="center" fontSize="4xl" color="white">What is your name?</FormLabel>
          <InputGroup size="lg">
            <Input
              type="text"
              variant="filled"
              className="form-field"
              placeholder="Enter name"
              onFocus={() => setTextFieldFocused(!textFieldFocused)}
              onBlur={() => setTextFieldFocused(!textFieldFocused)}
              style={{ color: textFieldFocused ? 'white' : 'black' }}
              onKeyPress={(e) => { if (e.key === 'Enter') handleSubmit(e) }}
              {...bindName}
            />
            <InputRightElement>
              <Button background="transparent" isDisabled={name.length === 0} onClick={handleSubmit}>
                <FaArrowRight color={textFieldFocused ? 'white' : 'black'}/>
              </Button>
            </InputRightElement>
          </InputGroup>
          <br/>
          <Link fontSize={["sm", "m"]} color="white" onClick={goToPrevStage}>Take me back!</Link>
        </FormControl>
      </Stack>
    )
  }
}


export default JoinForm

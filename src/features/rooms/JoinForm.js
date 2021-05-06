import React, { useState } from "react"
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Stack, Link } from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa'
import { useInput } from '../../hooks/useInput'
import { useDispatch } from "react-redux"
import { createRoom, joinRoom, setUserName } from './roomSlice'
import { success, error } from '../alerts/alertSlice'
import { useHistory } from "react-router-dom"

const JoinForm = () => {
  const { value:name, bind:bindName, reset:resetName } = useInput('')
  const { value:room, bind:bindRoom, reset:resetRoom } = useInput('')
  const [formStage, setFormStage] = useState(1)
  const [textFieldFocused, setTextFieldFocused] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (room === '') {
      dispatch(setUserName({userName: name}))
      dispatch(createRoom({userName: name})).then((data) => {
        if (data.type === 'room/create/fulfilled') {
          const roomData = data.payload.room
          dispatch(success(`Created room! Join with code: ${roomData.entryCode}`))
          history.push('/room')
        }
        else {
          dispatch(error(`Failed to create room!`))
          resetName()
          resetRoom()
          setFormStage(1)
        }
      })
    } else {
      dispatch(setUserName({userName: name}))
      dispatch(joinRoom({ roomCode: room, userName: name })).then((data) => {
        if (data.type === 'room/join/fulfilled') {
          const roomData = data.payload.room
          dispatch(success(`Joined room ${roomData.entryCode}!`))
          history.push('/room')
        } else {
          dispatch(error(`Failed to join room. Check your room code!`))
          resetName()
          resetRoom()
          setFormStage(1)
        }
      })

    }
  }

  const goToPrevStage = () => {
    setFormStage(1)
  }

  const goToNextStage = () => {
    // TODO: check if requested room exists? if not show error message?
    setFormStage(2)
  }

  if (formStage === 1) {
    return (
      <Stack w='400px' spacing={16}>
        <FormControl id="room-code">
          <FormLabel textAlign="center" fontSize="4xl">Have a room code?</FormLabel>
          <InputGroup size="lg">
            <Input
              pr="4.5rem"
              type="text"
              variant="filled"
              className="form-field"
              placeholder="Type room code, then press enter."
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
        <Button color="black" alignSelf="center" width="50%" onClick={goToNextStage}>
          Make a new room
        </Button>
      </Stack>
    )
  }
  if (formStage === 2) {
    return (
      <Stack w='400px' spacing={16}>
        <FormControl id="name">
          <FormLabel textAlign="center" fontSize="4xl">What is your name?</FormLabel>
          <InputGroup size="lg">
            <Input
              pr="4.5rem"
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
          <Link fontSize={["sm", "m"]} onClick={goToPrevStage}>Take me back!</Link>
        </FormControl>
      </Stack>
    )
  }
}


export default JoinForm

import React, { useState } from "react";
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Stack } from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa'
import { useInput } from '../../hooks/useInput'

const JoinForm = () => {
  const { value:name, bind:bindName, reset:resetName } = useInput('')
  const { value:room, bind:bindRoom, reset:resetRoom } = useInput('')
  const [formStage, setFormStage] = useState(1);

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (room === null) {
      // TODO: create new room
      alert(`creating new room for ${name}`)
    }
    else {
      // TODO: join room
      alert(`Submitting name: ${name} room: ${room}`)
    }
    resetName()
    resetRoom()
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
              placeholder="Type room code, then press enter."
              {...bindRoom}
            />
            <InputRightElement>
              <Button background="transparent" onClick={goToNextStage}>
                <FaArrowRight color="black"/>
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
              placeholder="Enter name"
              {...bindName}
            />
            <InputRightElement>
              <Button background="transparent" isDisabled={name.length === 0} onClick={handleSubmit}>
                <FaArrowRight color="white"/>
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Stack>
    )
  }
}


export default JoinForm

import React from 'react'
import { useInput } from '../hooks/useInput'
import { Button, Input, InputGroup } from '@chakra-ui/react'

export default function Login () {
  const { value:name, bind:bindName, reset:resetName } = useInput('')
  const { value:room, bind:bindRoom, reset:resetRoom } = useInput('')
  const handleSubmit = (evt) => {
    // TODO - call api to get JWT for login somehow and set isLoggedIn in redux state
    evt.preventDefault()
    alert(`Submitting name: ${name} room: ${room}`)
    resetName()
    resetRoom()
  }
  return (
    <>
    {/*TODO: make this pretty */}
    <InputGroup size="md">
      Name: {name}
      Room Code: {room}
      <Input
        pr="4.5rem"
        type="text"
        placeholder="Enter name"
        {...bindName}
      />
      <Input
        pr="4.5rem"
        type="text"
        placeholder="Enter room code"
        {...bindRoom}
      />
    </InputGroup>
    <Button onClick={handleSubmit}>
      Login
    </Button>
    </>
  )
}

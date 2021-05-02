import React from 'react'
import styles from '../styles.js'
import { useInput } from '../hooks/useInput'
import { Button, Center, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react'

export default function Join () {
  const { value:name, bind:bindName, reset:resetName } = useInput('')
  const { value:room, bind:bindRoom, reset:resetRoom } = useInput('')
  const handleSubmit = (evt) => {
    // TODO: pop up join dialogue ("have a room code?" input, or smaller "create room" button below, then step 2 is "enter your name")
    evt.preventDefault()
    alert(`Submitting name: ${name} room: ${room}`)
    resetName()
    resetRoom()
  }
  return (
    <>
    {/*TODO: make this pretty */}
    <Center bg="#6200EE" style={styles.pageBackground}>
      <Stack spacing={3}>
        <FormControl id="first-name" isRequired>
          <FormLabel>Your Name</FormLabel>
          <Input
            pr="4.5rem"
            type="text"
            placeholder="Enter name"
            {...bindName}
          />
        </FormControl>
        <FormControl id="first-name" isRequired>
          <FormLabel>Have a room code?</FormLabel>
          <Input
            pr="4.5rem"
            type="text"
            placeholder="Enter room code"
            {...bindRoom}
          />
        </FormControl>
        <Button color="black" onClick={handleSubmit}>
          Login
        </Button>
      </Stack>
    </Center>

    </>
  )
}

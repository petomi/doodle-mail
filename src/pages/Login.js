import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useInput } from '../hooks/useInput'
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { setLoggedIn } from '../store/appdataSlice'

export default function Login () {
  const isLoggedIn = useSelector((state) => state.appdata.isLoggedIn)
  const dispatch = useDispatch()
  const { value:email, bind:bindEmail, reset:resetEmail } = useInput('')
  const { value:password, bind:bindPassword, reset:resetPassword } = useInput('')
  const handleSubmit = (evt) => {
    // TODO - call api to get JWT for login somehow and set isLoggedIn in redux state
    evt.preventDefault()
    alert(`Submitting email: ${email} password: ${password}`)
    resetEmail()
    resetPassword()
    dispatch(setLoggedIn(!isLoggedIn))
  }
  const [showPassword, setShowPassword] = React.useState(false)
  const showPasswordToggle = () => setShowPassword(!showPassword)

  return (
    <>
    {/*TODO: make this pretty */}
    <InputGroup size="md">
      Email: {email}
      Password: {password}
      <Input
        pr="4.5rem"
        type="text"
        placeholder="Enter email"
        {...bindEmail}
      />
      <Input
        pr="4.5rem"
        type={showPassword ? "text" : "password"}
        placeholder="Enter password"
        {...bindPassword}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={showPasswordToggle}>
          {showPassword ? "Hide" : "Show"}
        </Button>
      </InputRightElement>

    </InputGroup>
    <Button onClick={handleSubmit}>
      Login
    </Button>
    </>
  )
}

import { useSelector, useDispatch } from 'react-redux'
import { Box, Stack } from '@chakra-ui/react'
import { setLoggedIn } from '../../store/appdataSlice'
import MenuItem from './MenuItem'

export default function MenuLinks({ isOpen }) {
  const isLoggedIn = useSelector((state) => state.appdata.isLoggedIn)
  const dispatch = useDispatch()
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to="/">Home</MenuItem>
        <LoginLogoutButton isLoggedIn={isLoggedIn} />
        {/* TODO: remove the test div below and move setting login to somewhere better. */}
        <div onClick={() => dispatch(setLoggedIn(!isLoggedIn))}>TOGGLE LOGIN</div>
      </Stack>
    </Box>
  )
}

const LoginLogoutButton = ({ isLoggedIn }) => {
  if (isLoggedIn) {
    return <MenuItem to="/logout" colorScheme="blue">Logout</MenuItem>
  } else {
    return <MenuItem to="/login" colorScheme="blue">Login</MenuItem>
  }
}

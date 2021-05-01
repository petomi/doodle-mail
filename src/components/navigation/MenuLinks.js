import { useDispatch, useSelector } from 'react-redux'
import { Box, Stack } from '@chakra-ui/react'
import MenuItem from './MenuItem'
import { setCurrentRoomCode } from '../../features/user/userSlice'

export default function MenuLinks({ isOpen }) {
  const currentRoomCode = useSelector((state) => state.user.currentRoomCode)
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
        <JoinRoomButton isInRoom={currentRoomCode != null} />
      </Stack>
    </Box>
  )
}

const JoinRoomButton = ({ isInRoom }) => {
  const dispatch = useDispatch()
  if (isInRoom) {
    return <MenuItem colorScheme="blue" onClick={dispatch(setCurrentRoomCode(null))}>Leave Room</MenuItem>
  } else {
    return <MenuItem to="/join" colorScheme="blue">Join Room</MenuItem>
  }
}

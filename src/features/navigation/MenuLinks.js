import { useDispatch, useSelector } from 'react-redux'
import { Box, Stack } from '@chakra-ui/react'
import MenuItem from './MenuItem'
import { leaveRoom } from '../rooms/roomSlice'
import { success, error } from '../alerts/alertSlice'

export default function MenuLinks({ isOpen }) {
  const roomCode = useSelector((state) => state.room.roomCode)
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
        <JoinRoomButton isInRoom={(roomCode != null)} />
      </Stack>
    </Box>
  )
}

const JoinRoomButton = ({ isInRoom }) => {
  const dispatch = useDispatch()
  if (isInRoom) {
    // TODO: pull these in from state
    const roomCode = ''
    const userName = ''
    return <MenuItem colorScheme="blue" onClick={() => {
      dispatch(leaveRoom({roomCode: roomCode, userName: userName})).then((data) => {
        if (data.type === 'room/leave/fulfilled') {
          dispatch(success(`Left room successfully.`))
        }
        else {
          dispatch(error(`Error leaving room.`))
        }
      })

    }}>Leave Room</MenuItem>
  } else {
    return <MenuItem to="/join" colorScheme="blue">Join Room</MenuItem>
  }
}

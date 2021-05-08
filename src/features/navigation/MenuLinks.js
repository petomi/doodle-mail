import { useDispatch, useSelector } from 'react-redux'
import { Box, Stack } from '@chakra-ui/react'
import NavButton from './NavButton'
import { leaveRoom } from '../rooms/roomSlice'
import { success, error } from '../alerts/alertSlice'

export default function MenuLinks({ isOpen }) {
  const roomCode = useSelector((state) => state.room.roomCode)
  const userName = useSelector((state) => state.room.userName)
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
        <JoinRoomButton roomCode={roomCode} userName={userName} />
      </Stack>
    </Box>
  )
}

const JoinRoomButton = ({roomCode, userName}) => {
  const dispatch = useDispatch()
  if (roomCode != null && roomCode !== undefined) {
    return <NavButton colorScheme="blue" onClick={() => {
      dispatch(leaveRoom({roomCode: roomCode, userName: userName})).then((data) => {
        if (data.type === 'room/leave/fulfilled') {
          dispatch(success(`Left room successfully.`))
        }
        else {
          dispatch(error(`Error leaving room.`))
        }
      })

    }}>Leave Room</NavButton>
  } else {
    return <NavButton to="/join" colorScheme="blue">Join Room</NavButton>
  }
}

import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userName: null,
    currentRoomCode: null,
    lastSyncDate: null
  },
  reducers: {
    setCurrentRoomCode: (state, roomCode) => {
      if (roomCode == null) {
        state.currentRoomCode = null
      } else {
        state.currentRoomCode = roomCode.payload
      }
    },
    setUserName: (state, name) => {
      if (name == null) {
        state.userName = null
      } else {
        state.userName = name.payload
      }
    },
    updateLastSyncDate: (state) => {
      state.lastSyncDate = new Date()
    }
  }
})

export const { setCurrentRoomCode, setUserName, updateLastSyncDate } = userSlice.actions

export default userSlice.reducer

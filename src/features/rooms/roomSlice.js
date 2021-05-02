import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// TODO: get base URL from .env file
const baseUrl = 'https://doodle-mail-server.herokuapp.com'

// TODO: may not need this endpoint
export const getRoomInfo = createAsyncThunk('room/getInfo', async (roomCode) => {
  const response = await axios.get(`${baseUrl}/rooms/${roomCode}/info`)
  if (response.ok) {
    alert('success!') // TODO
  } else {
    alert('failed!') // TODO
  }
})

export const createRoom = createAsyncThunk('room/create', async (userName) => {
  const response = await axios.post(`${baseUrl}/rooms`, { userName: userName })
  if (response.ok) {
    alert('success!') // TODO
  } else {
    alert('failed!') // TODO
  }
})

export const joinRoom = createAsyncThunk('room/join', async (roomCode, userName) => {
  const response = await axios.post(`${baseUrl}/rooms/${roomCode}/join`, { userName: userName })
  if (response.ok) {
    alert('success!') // TODO
  } else {
    alert('failed!') // TODO
  }
})

export const leaveRoom = createAsyncThunk('room/leave', async (roomCode, userName) => {
  const response = await axios.post(`${baseUrl}/rooms/${roomCode}/leave`, { userName: userName })
  if (response.ok) {
    alert('success!') // TODO
  } else {
    alert('failed!') // TODO
  }
})

export const getRoomMessages = createAsyncThunk('room/getMessages', async (roomId) => {
  const response = await axios.get(`${baseUrl}/rooms/${roomId}/messages`)
  if (response.ok) {
    alert('success!') // TODO
  } else {
    alert('failed!') // TODO
  }
})

export const sendMessageToRoom = createAsyncThunk('room/sendMessage', async (roomId, userName, messages) => {
  const response = await axios.post(`${baseUrl}/rooms/${roomId}/messages`, { userName: userName, messages: messages })
  if (response.ok) {
    alert('success!') // TODO
  } else {
    alert('failed!') // TODO
  }
})

export const deleteMessageFromRoom = createAsyncThunk('room/deleteMessage', async (messageId) => {
  const response = await axios.post(`${baseUrl}/messages`, { messageId: messageId })
  if (response.ok) {
    alert('success!') // TODO
  } else {
    alert('failed!') // TODO
  }
})

export const roomSlice = createSlice({
  name: 'room',
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

export const { setCurrentRoomCode, setUserName, updateLastSyncDate } = roomSlice.actions

export default roomSlice.reducer

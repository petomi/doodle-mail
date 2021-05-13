import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import socket from '../websocket/socket'

// get previous session data from storage and connect if possible
export const loadSavedSession = createAsyncThunk('session', async () => {
  const roomCode = localStorage.getItem('roomCode')
  const userName = localStorage.getItem('userName')
  if (roomCode && userName) {
    socket.auth = { userName: userName }
    socket.connect()
    // join room with current info
    socket.emit('rooms:join', roomCode)
  }
  return
})

// set up calls out to server
export const getRoomInfo = createAsyncThunk('room/getInfo', async ({roomCode}) => {
  socket.emit('rooms:info', roomCode)
  return
})

export const createRoom = createAsyncThunk('room/create', async ({userName}) => {
  socket.auth = { userName: userName }
  socket.connect() // TODO: only connect and set auth once for entire app
  socket.emit('rooms:create')
  return
})

// TODO: - write room and user data to localStorage, remove user from room when they close the app
export const joinRoom = createAsyncThunk('room/join', async ({roomCode, userName}) => {
  socket.auth = { userName: userName }
  socket.connect() // TODO: only connect and set auth once for entire app
  socket.emit('rooms:join', roomCode)
  return
})

export const leaveRoom = createAsyncThunk('room/leave', async ({roomCode}) => {
  socket.emit('rooms:leave', roomCode)
  clearRoomData()
  localStorage.removeItem('roomCode')
  return
})

export const getRoomMessages = createAsyncThunk('room/getMessages', async ({roomId}) => {
  socket.emit('rooms:messages', roomId)
  return
})

export const sendMessageToRoom = createAsyncThunk('room/sendMessage', async ({roomId, messages}) => {
  socket.emit('rooms:messages:send', roomId, messages)
  return
})

export const deleteMessageFromRoom = createAsyncThunk('room/deleteMessage', async ({roomId, messageId}) => {
  socket.emit('rooms:messages:delete', (messageId, roomId))
  return
})

export const roomSlice = createSlice({
  name: 'room',
  initialState: {
    userName: null,
    lastSyncDate: null,
    roomCode: null,
    roomData: {}
  },
  reducers: {
    clearRoomData: (state) => {
      state.roomCode = null
      state.RoomData = {}
    },
    setRoomCode: (state, roomCode) => {
      if (roomCode == null) {
        state.roomCode = null
      } else {
        state.roomCode = roomCode.payload
      }
    },
    setRoomData: (state, roomData) => {
      if (roomData == null) {
        state.roomData = {}
      } else {
        state.roomData = roomData.payload
      }
    },
    setUserName: (state, name) => {
      if (name == null) {
        state.userName = null
      } else {
        state.userName = name.payload
      }
    },
    updateRoomMessages: (state, messages) => {
      if (messages.payload.length > 0) {
        state.roomData.messages = messages.payload
      }
    },
    updateLastSyncDate: (state) => {
      state.lastSyncDate = new Date()
    }
  }
})

export const saveSessionData = (userName, roomCode) => {
  localStorage.setItem('userName', userName)
  localStorage.setItem('roomCode', roomCode)
}

export const { clearRoomData, setRoomCode, setRoomData, setUserName, updateRoomMessages } = roomSlice.actions

export default roomSlice.reducer

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import socket from '../websocket/socket'

// set up calls out to server
export const getRoomInfo = createAsyncThunk('room/getInfo', async ({roomCode, userName}) => {
  socket.auth = { userName }
  socket.connect() // TODO: only connect and set auth once for entire app

  socket.emit('rooms:info', roomCode)
  return
})

export const createRoom = createAsyncThunk('room/create', async ({userName}) => {
  socket.auth = { userName }
  socket.connect() // TODO: only connect and set auth once for entire app
  // TODO: pass userName through auth only once server supports it.
  socket.emit('rooms:create', userName)
  return
})

// TODO: - write room and user data to localStorage, remove user from room when they close the app
export const joinRoom = createAsyncThunk('room/join', async ({roomCode, userName}) => {
  socket.auth = { userName }
  socket.connect() // TODO: only connect and set auth once for entire app
  // TODO: disconnect on leave room

  socket.emit('rooms:join', roomCode, userName)
  return
})

export const leaveRoom = createAsyncThunk('room/leave', async ({roomCode, userName}) => {
  socket.auth = { userName }
  socket.connect() // TODO: only connect and set auth once for entire app

  socket.emit('rooms:leave', roomCode, userName)
  return
})

export const getRoomMessages = createAsyncThunk('room/getMessages', async ({roomId}) => {
  socket.connect() // TODO: only connect and set auth once for entire app

  socket.emit('rooms:messages', roomId)
  return
})

export const sendMessageToRoom = createAsyncThunk('room/sendMessage', async ({roomId, userName, messages}) => {
  socket.auth = { userName }
  socket.connect() // TODO: only connect and set auth once for entire app

  socket.emit('rooms:messages:send', roomId, userName, messages)
  return
})

export const deleteMessageFromRoom = createAsyncThunk('room/deleteMessage', async ({roomId, messageId, userName}) => {
  socket.auth = {userName}
  socket.connect()

  socket.emit('rooms:messages:delete', (messageId, roomId, userName))
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

export const { clearRoomData, setRoomCode, setRoomData, setUserName, updateRoomMessages } = roomSlice.actions

export default roomSlice.reducer

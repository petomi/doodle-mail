import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// TODO: get base URL from .env file
const baseUrl = 'https://doodle-mail-server.herokuapp.com'

// eslint-disable-next-line no-empty-pattern
export const wakeDb = createAsyncThunk('room/wake', async(thunkApi) => {
  const response = await axios.get(`${baseUrl}/`)
  if (response.status === 200) {
    return
  } else {
    return thunkApi.rejectWithValue({
      message: `Could not contact doodle-mail server.`
    })
  }
})

// TODO: may not need this endpoint
export const getRoomInfo = createAsyncThunk('room/getInfo', async ({roomCode}, thunkApi) => {
  const response = await axios.get(`${baseUrl}/rooms/${roomCode}/info`)
  if (response.status === 200) {
    return response.data
  } else {
    return thunkApi.rejectWithValue({
      message: response.data
    })
  }
})

export const createRoom = createAsyncThunk('room/create', async ({userName}, thunkApi) => {
  const response = await axios.post(`${baseUrl}/rooms`, { userName: userName })
  if (response.status === 200) {
    return response.data
  } else {
    return thunkApi.rejectWithValue({
      message: response.data
    })
  }
})

export const joinRoom = createAsyncThunk('room/join', async ({roomCode, userName}, thunkApi) => {
  const response = await axios.post(`${baseUrl}/rooms/${roomCode}/join`, { userName: userName })
  if (response.status === 200) {
    return response.data
  } else {
    return thunkApi.rejectWithValue({
      message: response.data
    })
  }
})

export const leaveRoom = createAsyncThunk('room/leave', async ({roomCode, userName}, thunkApi) => {
  const response = await axios.post(`${baseUrl}/rooms/${roomCode}/leave`, { userName: userName })
  console.log(response)
  if (response.status === 200) {
    return response.data
  } else {
    return thunkApi.rejectWithValue({
      message: response.data
    })
  }
})

export const getRoomMessages = createAsyncThunk('room/getMessages', async ({roomId}, thunkApi) => {
  const response = await axios.get(`${baseUrl}/rooms/${roomId}/messages`)
  if (response.status === 200) {
    return response.data
  } else {
    return thunkApi.rejectWithValue({
      message: response.data
    })
  }
})

export const sendMessageToRoom = createAsyncThunk('room/sendMessage', async ({roomId, userName, messages}, thunkApi) => {
  const response = await axios.post(`${baseUrl}/rooms/${roomId}/messages`, { userName: userName, messages: messages })
  if (response.status === 200) {
    return response.data
  } else {
    return thunkApi.rejectWithValue({
      message: response.data
    })
  }
})

export const deleteMessageFromRoom = createAsyncThunk('room/deleteMessage', async ({roomId, messageId}, thunkApi) => {
  const response = await axios.post(`${baseUrl}/rooms/${roomId}/messages`, { messageId: messageId })
  if (response.status === 200) {
    return response.data
  } else {
    return thunkApi.rejectWithValue({
      message: response.data
    })
  }
})

export const roomSlice = createSlice({
  name: 'room',
  initialState: {
    userName: 'test', // null, // TODO: set this to null after debugging
    lastSyncDate: null,
    roomCode: 'cBSL', // null, // TODO: change this to null after dev work is done
    roomData: { _id: '6083307c10cd25158809b90b', messages: [{title: 'test1', author: 'pleb', imageData: '', date: 'now'}, {title: 'test2', author: 'bob', imageData: '', date: 'feb 2 2021'}] } // {} // TODO: change this to empty object after dev work is done
  },
  reducers: {
    setRoomCode: (state, roomCode) => {
      if (roomCode == null) {
        state.roomCode = null
      } else {
        state.roomCode = roomCode.payload
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
  },
  extraReducers: builder => {
    builder
      .addCase(getRoomInfo.fulfilled, (state, action) => {
        state.roomData = action.payload.room
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.roomCode = action.payload.room.entryCode
        state.roomData = action.payload.room
      })
      .addCase(joinRoom.fulfilled, (state, action) => {
        state.roomCode = action.payload.room.entryCode
        state.roomData = action.payload.room
      })
      .addCase(leaveRoom.fulfilled, (state) => {
        state.roomCode = null
        state.roomData = {}
      })
      .addCase(getRoomMessages.fulfilled, (state, action) => {
        state.roomData.messages = action.payload
      })
      .addCase(sendMessageToRoom.fulfilled, (state, action) => {
        state.roomData.messages = action.payload
      })
      .addCase(deleteMessageFromRoom.fulfilled, (state, action) => {
        state.roomData.messages = action.payload
      })
  }
})

export const { setRoomCode, setUserName, updateLastSyncDate } = roomSlice.actions

export default roomSlice.reducer

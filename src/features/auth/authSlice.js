import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    lastSyncDate: null
  },
  reducers: {
    setLoggedIn: (state, loggedIn) => {
      state.isLoggedIn = loggedIn.payload
    },
    updateLastSyncDate: (state) => {
      state.lastSyncDate = new Date()
    }
  }
})

export const { setLoggedIn, updateLastSyncDate } = authSlice.actions

export default authSlice.reducer

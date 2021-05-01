import { createSlice } from '@reduxjs/toolkit'

export const appdataSlice = createSlice({
  name: 'appdata',
  initialState: {
    alerts: [],
    isLoggedIn: false,
    lastSyncDate: null
  },
  reducers: {
    hideAlerts: (state) => {
      state.alerts = []
    },
    showAlert: (state, alert) => {
      state.alerts = []
      state.alerts.push({
        text: alert.payload.text,
        type: alert.payload.type
      })
    },
    setLoggedIn: (state, loggedIn) => {
      state.isLoggedIn = loggedIn.payload
    },
    updateLastSyncDate: (state) => {
      state.lastSyncDate = new Date()
    }
  }
})

export const { hideAlerts, showAlert, setLoggedIn, updateLastSyncDate } = appdataSlice.actions

export default appdataSlice.reducer

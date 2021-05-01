import { createSlice } from '@reduxjs/toolkit'

export const appdataSlice = createSlice({
  name: 'appdata',
  initialState: {
    alerts: [],
    isLoggedIn: false,
    lastSyncDate: null
  },
  reducers: {
    hideAlert: (state, index) => {
      state.alerts.splice(index.payload, 1)
    },
    hideAlerts: (state) => {
      state.alerts = []
    },
    showAlert: (state, alert) => {
      state.alerts = []
      state.alerts.push({
        text: alert.payload.description,
        type: alert.payload.status
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

export const { hideAlert, hideAlerts, showAlert, setLoggedIn, updateLastSyncDate } = appdataSlice.actions

export default appdataSlice.reducer

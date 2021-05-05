import { createSlice } from '@reduxjs/toolkit'

export const alertSlice = createSlice({
  name: 'alerts',
  initialState: {
    alerts: [],
  },
  reducers: {
    hideAlert: (state, index) => {
      state.alerts.splice(index.payload, 1)
    },
    hideAlerts: (state) => {
      state.alerts = []
    },
    success: (state, message) => {
      state.alerts = []
      state.alerts.push({
        description: message.payload,
        status: 'success'
      })
    },
    error: (state, message) => {
      state.alerts = []
      state.alerts.push({
        description: message.payload,
        status: 'error'
      })
    }
  }
})

export const { hideAlert, hideAlerts, success, error } = alertSlice.actions

export default alertSlice.reducer

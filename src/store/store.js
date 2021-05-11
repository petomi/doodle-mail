import { configureStore } from '@reduxjs/toolkit'
import roomReducer from '../features/rooms/roomSlice'
import alertReducer from '../features/alerts/alertSlice'

export default configureStore({
  reducer: {
    alerts: alertReducer,
    room: roomReducer,
  }
})

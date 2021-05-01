import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import alertReducer from '../features/alerts/alertSlice'

export default configureStore({
  reducer: {
    alerts: alertReducer,
    user: userReducer,
  }
})

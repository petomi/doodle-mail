import { configureStore } from '@reduxjs/toolkit'
import appdataReducer from './appdataSlice'

export default configureStore({
  reducer: {
    appdata: appdataReducer
  }
})

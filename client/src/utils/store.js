import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import annotationReducer from './annotationSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    annotation: annotationReducer,
  },
})
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import annotationReducer from './annotationSlice'
import vendorSlice from './vendorSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    annotation: annotationReducer,
    vendor:vendorSlice
  },
})
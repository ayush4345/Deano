import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  xmtpAnnotator:"0x937C0d4a6294cdfa575de17382c7076b579DC176"
}

export const vendorSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setXmtpAnnotator: (state, action) => {
      state.xmtpAnnotator = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setXmtpAnnotator } = vendorSlice.actions

export default vendorSlice.reducer
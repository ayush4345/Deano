import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userType: "",
  isUser: true,
  userAddress: "",
  name: ""
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserType: (state, action) => {
      state.userType = action.payload
    },
    setIsUser: (state, action) => {
      state.isUser = action.payload
    },
    setUserAddress: (state, action) => {
      state.userAddress = action.payload
    },
    setUserName: (state, action) => {
      state.name = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserType, setUserAddress, setUserName } = userSlice.actions

export default userSlice.reducer
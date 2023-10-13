import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userType: "",
  isUser: true,
}

export const userSlice = createSlice({
  name:'user',
  initialState,
  reducers: {
    setUserType: (state, action) => {
      state.userType = action.payload
    },
    setIsUser: (state, action) => {
        state.isUser = action.payload
      },
  },
})

// Action creators are generated for each case reducer function
export const { setUserType } = userSlice.actions

export default userSlice.reducer
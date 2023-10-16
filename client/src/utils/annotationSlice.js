import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    annotation: [],
}

export const annotationSlice = createSlice({
    name: 'annotation',
    initialState,
    reducers: {
        setAnnotations: (state, action) => {
            state.annotation.push(action.payload)
        },
        updateAnnotations: (state, action) => {
            state.annotation.splice(state.annotation.findIndex((value) => value.imageId == action.payload.imageId), 1, Object.assign(action.payload))
        }
    },
})

// Action creators are generated for each case reducer function
export const { setAnnotations,updateAnnotations } = annotationSlice.actions

export default annotationSlice.reducer
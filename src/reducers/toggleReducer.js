import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    inboxVisible: false,
    taskVisible: false,
    quickVisible: false
}

const toggleSlice = createSlice({
  name: 'toggle',
  initialState: initialState,
  reducers: {
    toggleQuick: (state, action) => {
        state.quickVisible = !state.quickVisible
        state.inboxVisible = false
        state.taskVisible = false
    },
    toggleInbox: (state, action) => {
        state.inboxVisible = !state.inboxVisible
        state.taskVisible = false
    },
    toggleTask: (state, action) => {
        state.inboxVisible = false
        state.taskVisible = !state.taskVisible
    }
  },
})

export const { toggleQuick, toggleInbox, toggleTask } = toggleSlice.actions

export default toggleSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeChatId: null
}

const activeChatSlice = createSlice({
  name: 'activeChat',
  initialState: initialState,
  reducers: {
    setActiveChatId: (state, action) => {
      return {...state, activeChatId: action.payload}
    },
  },
})

export const { setActiveChatId } = activeChatSlice.actions

export default activeChatSlice.reducer

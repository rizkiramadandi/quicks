import { createSlice, current } from '@reduxjs/toolkit'
import { inboxInitialState } from './inboxInitialState'

import { v4 as uuidv4 } from 'uuid'
import { dateFormatter } from '../../../utilities/dateUtils'

const initialState = {
  inboxes: await inboxInitialState(),
}

const inboxSlice = createSlice({
  name: 'inbox',
  initialState: initialState,
  reducers: {
    toggleIsRead: (state, action) => {
      state.inboxes.mails.map((mail) => {
        if (mail.id === action.payload) mail.isRead = !mail.isRead
        return mail
      })
    },
    sendMail: (state, action) => {
      const inbox = state.inboxes.find(
        (inbox) => inbox.id === action.payload.id,
      )
      if (inbox) {
        inbox.mails.push({
          id: uuidv4(),
          from: null,
          date: dateFormatter(new Date(), `YYYY-MM-DD hh:mm:ss`),
          content: action.payload.body,
          isRead: true,
          replyTo: action.payload.replyTo || null,
        })
      }
    },
    updateRead: (state, action) => {
      state.inboxes
        .find((inbox) => inbox.id === action.payload)
        .mails.map((mail) => {
          mail.isRead = true
        })
    },
  },
})

export const { toggleIsRead, sendMail, updateRead } = inboxSlice.actions

export default inboxSlice.reducer

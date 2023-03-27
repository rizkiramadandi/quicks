import { configureStore } from '@reduxjs/toolkit'

import todosReducer from '../features/task/reducers/todosReducer'
import inboxReducer from '../features/inbox/reducers/inboxReducer'
import toggleReducer from '../reducers/toggleReducer'
import activeChatReducer from '../features/inbox/reducers/activeChatReducer'

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    inbox: inboxReducer,
    toggle: toggleReducer,
    activeChat: activeChatReducer
  }
})
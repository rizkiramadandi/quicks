import { createSlice } from '@reduxjs/toolkit'
import { todosInitialState } from './todosInitialState'

const initialState = {
  todos: await todosInitialState()
}

const todosSlice = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id:
          'TODO_' + new Date().getTime() + Math.floor(Math.random() * 9999999),
        name: null,
        description: null,
        deadline: null,
        isDone: false,
        label: [],
        isCollapsed: true,
      })
    },
    deleteTodo: (state, action) => {
      if(!confirm('Are you sure want to delete this todo?')) return
      return {...state, todos:state.todos.filter(todo => {
        if(todo.id !== action.payload) return todo
      })}
    },
    toggleCollapseTodo: (state, action) => {
      state.todos.map(todo => {
        if(todo.id === action.payload) todo.isCollapsed = !todo.isCollapsed
        return todo
      })
    },
    toggleDoneTodo: (state, action) => {
      state.todos.map(todo => {
        if(todo.id === action.payload) todo.isDone = !todo.isDone
        return todo
      })
    },
    editTodoName: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id)
      if(todo) {
        todo.name = action.payload.name
      }
    },
    editTodoDescription: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id)
      if(todo) {
        todo.description = action.payload.description
      }
    },
    editTodoDeadline: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id)
      if(todo) {
        todo.deadline = action.payload.deadline
      }
    },
    addLabel: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id)
      if(todo && !todo.label.map(label => label.name).includes(action.payload.label.name)) {
        todo.label.push(action.payload.label)
      }
    }
  },
})

export const { addTodo, deleteTodo, toggleCollapseTodo, toggleDoneTodo, editTodoName, editTodoDescription, editTodoDeadline, addLabel } = todosSlice.actions

export default todosSlice.reducer

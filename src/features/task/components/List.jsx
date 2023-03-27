import { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import {
  addTodo
} from '../reducers/todosReducer'
import Loader from '../../../components/Loader'
import Todo from './Todo'

export default function List() {
  const todos = useSelector((state) => state.todos.todos)
  const dispatch = useDispatch()

  const [isLoaded, setIsLoaded] = useState(false)

  // trigger onload
  useEffect(() => {
    // simulate loading for 1000 miliseconds before render all todos
    setTimeout(() => {
      setIsLoaded(true)
    }, 1000)
  }, [])

  return (
    <>
      <div className="p-[18px_23px] flex flex-col gap-[22px] h-full text-[var(--primary-dark)]">
        <div className="flex py-2 items-center px-0">
          <select className="border rounded px-4 py-2 border-[var(--primary-grey)] ml-[4rem]">
            <option value="">My Tasks</option>
            <option value="">Personal Errands</option>
            <option value="">Urgent To-Do</option>
          </select>

          <button
            className="bg-[var(--primary-blue)] px-4 py-2 rounded text-white ml-auto font-bold"
            onClick={() => dispatch(addTodo())}
          >
            New Task
          </button>
        </div>

        {isLoaded ? (
          // todo list container
          <div className="max-y-[calc(100%-72px)] overflow-y-auto h-full flex flex-col gap-4 px-[2rem] py-4">
            {todos.map((todo, idx) => (
                <Todo key={todo.id} todo={todo} idx={idx} />
            ))}
          </div>
        ) : (
          <>
            <Loader subtitle={'Task List'} />
          </>
        )}
      </div>
    </>
  )
}

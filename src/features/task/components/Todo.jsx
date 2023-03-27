import {
  addLabel,
  deleteTodo,
  editTodoDeadline,
  editTodoDescription,
  editTodoName,
  toggleCollapseTodo,
  toggleDoneTodo,
} from '../reducers/todosReducer'

import ChevronIcon from '../../../assets/icon/navigation/chevron.svg'
import { ReactComponent as ScheduleIcon } from '../../../assets/icon/action/schedule.svg'
import { ReactComponent as EditIcon } from '../../../assets/icon/image/edit.svg'
import { ReactComponent as DotsIcon } from '../../../assets/icon/navigation/more_horiz_24px.svg'
import { ReactComponent as CheckboxIcon } from '../../../assets/icon/toggle/checkbox.svg'
import { ReactComponent as CheckboxCheckedIcon } from '../../../assets/icon/toggle/checkbox_checked.svg'
import { ReactComponent as BookmarkIcon } from '../../../assets/icon/action/bookmark.svg'

import { dateDiff, dateFormatter } from '../../../utilities/dateUtils'
import { useDispatch } from 'react-redux'
import { useMemo, useState } from 'react'

import ContentEditable from 'react-contenteditable'

export default function Todo({ todo, idx }) {
  const dispatch = useDispatch()
  const [activeActionId, setActiveActionId] = useState(null)
  const [activeLabelId, setActiveLabelId] = useState(null)
  const labels = useMemo(() => {
    return [
      { name: `Important ASAP`, color: `#E5F1FF` },
      { name: `Offline Meeting`, color: `#FDCFA4` },
      { name: `Virtual Meeting`, color: `#F9E9C3` },
      { name: `ASAP`, color: `#AFEBDB` },
      { name: `Client Related`, color: `#CBF1C2` },
      { name: `Self Task`, color: `#CFCEF9` },
      { name: `Appointments`, color: `#F9E0FD` },
      { name: `Court Related`, color: `#9DD0ED` },
    ]
  }, [])

  function handleDescription(e) {
    dispatch(
      editTodoDescription({
        id: todo.id,
        description: e.currentTarget.textContent,
      }),
    )
  }

  function handleName(e) {
    dispatch(editTodoName({ id: todo.id, name: e.currentTarget.textContent }))
  }

  function handleAction() {
    if (activeActionId) {
      setActiveActionId(null)
    } else {
      setActiveActionId(todo.id)
    }
  }

  function handleLabel() {
    if (activeLabelId) {
      setActiveLabelId(null)
    } else {
      setActiveLabelId(todo.id)
    }
  }

  return (
    <>
      {idx > 0 ? <hr className="my-0 bg-[var(--primary-grey)]" /> : <></>}

      {/* todo container */}
      <div>
        <div className="flex gap-4">
          <div className="flex gap-4 grow items-center">
            <div
              className="min-w-[18px] min-h-[18px] w-[18px] h-[18px] hover:cursor-pointer"
              type="checkbox"
              onClick={() => dispatch(toggleDoneTodo(todo.id))}
            >
              {todo.isDone ? (
                <CheckboxCheckedIcon className="w-full h-full" />
              ) : (
                <CheckboxIcon className="w-full h-full" />
              )}
            </div>
            <ContentEditable
              className={
                'grow resize-none leading-5 rounded h-fit outline-[var(--primary-grey)] before:absolute relative before:top-2 before:left-2 w-full p-2 outline-1' +
                (todo.name
                  ? ' font-bold'
                  : " before:content-['Type_Task_Title']") +
                (todo.isDone ? ' line-through' : '') +
                (todo.name ? ' focus:outline' : ' outline')
              }
              html={todo.name}
              onChange={(e) => handleName(e)}
            />
          </div>
          <div className="flex items-center gap-4 whitespace-nowrap">
            {!todo.isDone && todo.deadline ? (
              <div className="text-[var(--indicator-red)]">
                {dateDiff(new Date(todo.deadline), new Date())} Day(s)
                {new Date(todo.deadline) > new Date() ? ' Left' : ' Ago'}
              </div>
            ) : (
              <div>⠀</div>
            )}
            <div>
              {todo.deadline ? dateFormatter(todo.deadline, `DD/MM/YYYY`) : ''}
            </div>
            <div
              className="hover:cursor-pointer w-[10px]"
              onClick={() => dispatch(toggleCollapseTodo(todo.id))}
            >
              <img
                src={ChevronIcon}
                alt="Chevron Icon"
                className={todo.isCollapsed ? '' : 'rotate-180'}
              />
            </div>
            <div className="relative">
              <div
                onClick={() => handleAction()}
                className="hover:cursor-pointer flex items-center"
              >
                <DotsIcon fill="#828282" className="min-h-[4px] h-[4px]" />
              </div>

              {/* action for todo */}
              {activeActionId === todo.id ? (
                <>
                  <div className="absolute top-[calc(100%+.5rem)] w-[126px] right-0 bg-white border rounded flex flex-col">
                    <div
                      className="border text-[var(--indicator-red)] px-4 py-2 hover:cursor-pointer"
                      onClick={() => dispatch(deleteTodo(todo.id))}
                    >
                      Delete
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        {todo.isCollapsed ? (
          <>
            <div className="flex flex-col gap-4 pl-4 py-4">
              <div className="flex gap-4 px-4 items-center">
                <label htmlFor={`deadline-${todo.id}`}>
                  <ScheduleIcon
                    fill={todo.deadline ? '#2F80ED' : '#424242'}
                    className="min-w-[16px] min-h-[16px] w-[16px] h-[16px]"
                  />
                </label>
                <div>
                  <input
                    id={`deadline-${todo.id}`}
                    className="border border-[var(--primary-grey)] rounded px-4 py-2"
                    type="date"
                    placeholder="Set Date"
                    defaultValue={todo.deadline}
                    onChange={(e) =>
                      dispatch(
                        editTodoDeadline({
                          id: todo.id,
                          deadline: e.target.value,
                        }),
                      )
                    }
                  />
                </div>
              </div>

              <div className="flex gap-4 px-4 leading-5">
                <label
                  className="h-fit hover:cursor-pointer"
                  htmlFor={`description-${todo.id}`}
                  onClick={() =>
                    document.getElementById(`description-${todo.id}`).focus()
                  }
                >
                  <EditIcon
                    fill={todo.description ? '#2F80ED' : '#424242'}
                    className="min-w-[15px] min-h-[15px] w-[15px] h-[15px]"
                  />
                </label>
                <ContentEditable
                  id={`description-${todo.id}`}
                  className={
                    'before:absolute relative before:top-0 before:left-0 w-full focus:outline outline-1 outline-[var(--primary-grey)]' +
                    (todo.description
                      ? ''
                      : " before:content-['No_Description']")
                  }
                  html={todo.description ? todo.description : ``}
                  disabled={false}
                  onChange={(e) => handleDescription(e)}
                />
              </div>

              <div className="flex gap-4 leading-5 bg-[#F9F9F9] items-center rounded p-4">
                <div className="hover:cursor-pointer relative">
                  <BookmarkIcon
                    fill={todo.label.length > 0 ? '#2F80ED' : '#424242'}
                    className="min-w-[15px] min-h-[15px] w-[15px] h-[15px]"
                    onClick={() => handleLabel(todo.id)}
                  />

                  {activeLabelId === todo.id ? (
                    <>
                      <div className="absolute top-[calc(100%+.5rem)] left-0 bg-white p-4 border border-[var(--primary-grey)] rounded-lg z-[1] flex flex-col gap-1 w-[277px] min-w-[277px]">
                        {labels.map((label, idx) => (
                          <div
                            key={idx}
                            style={{ backgroundColor: label.color }}
                            className="font-bold whitespace-nowrap px-2 py-1 rounded text-[12px]"
                            onClick={() =>
                              dispatch(addLabel({ id: todo.id, label: label }))
                            }
                          >
                            {label.name}
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="flex gap-1 flex-wrap">
                  {todo.label.map((label, idx) => (
                    <div
                      key={idx}
                      style={{ backgroundColor: label.color }}
                      className="block px-2 py-1 rounded whitespace-nowrap text-[12px] font-bold"
                    >
                      {label.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  )
}

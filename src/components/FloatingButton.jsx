import InboxContainer from '../features/inbox/components/Container'
import TaskContainer from '../features/task/components/Container'

import QuickIcon from '../assets/icon/quick.svg'
import InboxIcon from '../assets/icon/action/question_answer_24px.svg'
import TaskIcon from '../assets/icon/action/chrome_reader_mode_24px.svg'
import { useDispatch, useSelector } from 'react-redux'
import { toggleQuick, toggleInbox, toggleTask } from '../reducers/toggleReducer'

export default function FloatingButton() {
  const { quickVisible, taskVisible, inboxVisible } = useSelector(
    (state) => state.toggle,
  )
  const dispatch = useDispatch()

  return (
    <>
      <div className="fixed bottom-4 right-4 flex gap-6 flex-row-reverse items-center">
        <button
          className={"rounded-full w-[68px] h-[68px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.1)]" + (!inboxVisible && !taskVisible ? " relative bg-[var(--primary-blue)]":" absolute right-4 bg-[var(--primary-dark)]")}
          onClick={() => dispatch(toggleQuick())}
        >
          <img
            className="absolute left-[50%] top-[50%] w-[18px] translate-x-[-50%] translate-y-[-50%]"
            src={QuickIcon}
            alt="Quick Icon"
          />
        </button>

        {quickVisible ? (
          <>
            <div
              className={
                'flex gap-4 flex-col items-center relative ' +
                (inboxVisible ? 'order-1' : 'order-2')
              }
            >
              <div className="text-[var(--primary-light)] absolute bottom-[110%]">
                Inbox
              </div>
              <button
                className={
                  'relative rounded-full drop-shadow-[0_4px_4px_rgba(0,0,0,0.1)] ' +
                  (inboxVisible
                    ? 'bg-[var(--indicator-blue)] w-[68px] h-[68px] drop-shadow-[-1rem_0_0_var(--primary-dark)]'
                    : 'bg-[var(--background-button)] w-[60px] h-[60px]')
                }
                onClick={() => dispatch(toggleInbox())}
              >
                <img
                  className={
                    'absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] ' +
                    (inboxVisible ? 'brightness-0 invert' : '')
                  }
                  src={InboxIcon}
                  alt="Inbox Icon"
                />
              </button>
            </div>

            <div
              className={
                'flex gap-4 flex-col items-center relative ' +
                (taskVisible ? 'order-1' : 'order-2')
              }
            >
              <div className="text-[var(--primary-light)] absolute bottom-[110%]">
                Task
              </div>
              <button
                className={
                  'relative rounded-full drop-shadow-[0_4px_4px_rgba(0,0,0,0.1)] ' +
                  (taskVisible
                    ? 'bg-[var(--indicator-orange)] w-[68px] h-[68px] drop-shadow-[-1rem_0_0_var(--primary-dark)]'
                    : 'bg-[var(--background-button)] w-[60px] h-[60px]')
                }
                onClick={() => dispatch(toggleTask())}
              >
                <img
                  className={
                    'absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] ' +
                    (taskVisible ? 'brightness-0 invert' : '')
                  }
                  src={TaskIcon}
                  alt="Task Icon"
                />
              </button>
            </div>
          </>
        ) : (
          <></>
        )}

        {/* inbox component */}
        {inboxVisible ? <InboxContainer /> : <></>}

        {/* task component */}
        {taskVisible ? <TaskContainer /> : <></>}
      </div>
    </>
  )
}

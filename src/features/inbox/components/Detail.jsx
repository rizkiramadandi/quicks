import { useMemo, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { ReactComponent as ArrowBackIcon } from '../../../assets/icon/navigation/arrow_back_24px.svg'
import { ReactComponent as CloseIcon } from '../../../assets/icon/navigation/close_24px.svg'
import { toggleInbox } from '../../../reducers/toggleReducer'

import { setActiveChatId } from '../reducers/activeChatReducer'
import { sendMail, updateRead } from '../reducers/inboxReducer'

import Chat from './Chat'

export default function Detail() {
  const [newMessage, setNewMessage] = useState('')
  const [replyTo, setReplyTo] = useState(null)

  const inboxes = useSelector((state) => state.inbox.inboxes, shallowEqual)
  const activeChatId = useSelector(
    (state) => state.activeChat.activeChatId,
    shallowEqual,
  )
  const dispatch = useDispatch()

  const activeInbox = useMemo(() => {
    return inboxes.find((inbox) => inbox.id === activeChatId)
  }, [activeChatId, inboxes])

  const sortedMails = useMemo(() => {
    return activeInbox.mails
      .slice()
      .sort((a, b) => new Date(a.date) - new Date(b.date))
  }, [activeChatId, inboxes])

  const participantsCount = useMemo(() => {
    return Array.from(new Set(activeInbox.mails.map((mail) => mail.from)))
      .length
  }, [activeChatId])

  function closeChat() {
    dispatch(setActiveChatId(null))
    dispatch(updateRead(activeInbox.id))
  }

  function closeInbox() {
    dispatch(setActiveChatId(null))
    dispatch(toggleInbox())
    dispatch(updateRead(activeInbox.id))
  }

  function send() {
    if (newMessage) {
      setNewMessage('')
      setReplyTo(null)
      dispatch(
        sendMail({ id: activeInbox.id, body: newMessage, replyTo: replyTo }),
      )
    }
  }

  return (
    <>
      <div className="flex border-b p-[20px_32px] gap-4 items-center border-[#BDBDBD] bg-white z-[100] h-[78px]">
        <ArrowBackIcon
          className="w-[16px] h-[16px] hover:cursor-pointer"
          onClick={closeChat}
        />
        <div className="flex flex-col">
          <div className="font-bold text-[var(--primary-blue)] text-[16px] line-clamp-1">
            {activeInbox.title}
          </div>
          {participantsCount > 2 ? (
            <div>{participantsCount} Participants</div>
          ) : (
            <></>
          )}
        </div>
        <CloseIcon
          className="w-[14px] h-[14px] ml-auto hover:cursor-pointer"
          onClick={closeInbox}
        />
      </div>

      <div
        id="mail-container"
        className="flex p-[20px_32px] gap-4 flex-col overflow-y-auto max-h-[calc(100%-78px-86px)] h-[calc(100%-78px-86px)]"
      >
        {
          // sort the message by date
          sortedMails.map((mail, idx) => {
            return (
              <Chat key={mail.id} mail={mail} idx={idx} sortedMails={sortedMails} setReplyTo={setReplyTo} activeInbox={activeInbox} />
            )
          })
        }
      </div>

      <div className="flex flex-col border-t p-[20px_32px] gap-4 items-center border-[#BDBDBD] bg-white">
        <div className="flex w-full gap-4">
          <div className="grow relative">
            <input
              className="grow border border-[var(--primary-grey)] rounded p-2 w-full"
              type="text"
              placeholder="Your message here..."
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
              onKeyUp={(e) => (e.key === 'Enter' ? send() : null)}
            />

            {replyTo ? (
              <>
                <div className="absolute bottom-[100%] left-0 w-full bg-[var(--background-button)] p-4 border border-[var(--primary-grey)] rounded-t-lg">
                  <div className="flex">
                    <div className="text-[var(--text-sm)] flex flex-col">
                      <div className="font-bold">
                        Replying to{' '}
                        {
                          activeInbox.mails.find((mail) => mail.id === replyTo)
                            .from
                        }
                      </div>
                      <div className="leading-5">
                        {
                          activeInbox.mails.find((mail) => mail.id === replyTo)
                            .content
                        }
                      </div>
                    </div>

                    <div>
                      <button
                        className="ml-auto"
                        onClick={() => setReplyTo(null)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          <button
            className="bg-[var(--primary-blue)] text-white px-4 py-2 rounded"
            onClick={() => send()}
          >
            Send
          </button>
        </div>
      </div>
    </>
  )
}

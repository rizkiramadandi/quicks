import { useState } from 'react'
import { ReactComponent as DotsIcon } from '../../../assets/icon/navigation/more_horiz_24px.svg'
import { dateFormatter, isToday } from '../../../utilities/dateUtils'

export default function Chat({
  mail,
  idx,
  sortedMails,
  setReplyTo,
  activeInbox,
}) {
  const [activeActionId, setActiveActionId] = useState(null)

  function toggleActiveActionId(id) {
    if (activeActionId === id) {
      setActiveActionId(null)
    } else {
      setActiveActionId(id)
    }
  }
  return (
    <>
      <div key={mail.id}>
        {mail.isRead === false ? (
          <>
            <div className="relative font-bold my-8">
              <hr className="bg-[var(--indicator-red)] text-[var(--indicator-red)] h-[1px]" />
              <span className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white px-8 z-[0] text-[var(--indicator-red)]">
                New Message
              </span>
            </div>
          </>
        ) : idx === 0 ||
          (idx > 0 &&
            dateFormatter(sortedMails[idx].date, 'MM DD, YYYY') !==
              dateFormatter(sortedMails[idx - 1].date, 'MM DD, YYYY')) ? (
          <>
            <div className="relative font-bold my-8">
              <hr className="bg-[var(--primary-dark)] text-[var(--primary-dark)] h-[1px]" />
              <span className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white px-8 z-[0]">
                {isToday(mail.date) ? 'Today ' : ''}
                {dateFormatter(mail.date, 'MMM DD, YYYY')}
              </span>
            </div>
          </>
        ) : (
          <></>
        )}
        <div
          id={mail.id}
          className={
            'flex flex-col max-w-[75%] gap-1 ' +
            (mail.from === null ? 'ml-auto items-end' : '')
          }
        >
          <div
            className={
              'font-bold ' +
              (mail.from === null
                ? 'text-[var(--chats-purple)]'
                : 'text-[var(--chats-orange)]')
            }
          >
            {mail.from || 'You'}
          </div>
          <div className="flex flex-col gap-2">
            <div>
              {mail.replyTo ? (
                <a
                  className="px-3 py-2 bg-[var(--background-button)] block leading-5 rounded"
                  href={`#${mail.replyTo}`}
                >
                  {activeInbox.mails.find((m) => m.id === mail.replyTo).content}
                </a>
              ) : (
                ''
              )}
            </div>

            <div
              className={
                'flex gap-2 ' + (mail.from === null ? 'flex-row-reverse' : '')
              }
            >
              <div
                className={
                  'px-3 py-2 rounded flex flex-col gap-2 leading-5 ' +
                  (mail.from === null
                    ? 'bg-[var(--chats-light-purple)]'
                    : 'bg-[var(--chats-light-orange)]')
                }
              >
                <div>{mail.content}</div>
                <div className="text-[12px]">
                  {dateFormatter(mail.date, 'hh:mm')}
                </div>
              </div>
              <div className="hover:cursor-pointer relative h-fit">
                <DotsIcon
                  className="w-[11px]"
                  onClick={() => toggleActiveActionId(mail.id)}
                />
                {/* action for own chat */}
                {activeActionId === mail.id && mail.from === null ? (
                  <>
                    <div className="absolute top-[calc(100%+.5rem)] w-[126px] right-0 bg-white border rounded flex flex-col">
                      <div className="border text-[var(--primary-blue)] px-4 py-2">
                        Edit
                      </div>
                      <div className="border text-[var(--indicator-red)] px-4 py-2">
                        Delete
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                {/* action for other chat */}
                {activeActionId === mail.id && mail.from !== null ? (
                  <>
                    <div className="absolute top-[calc(100%+.5rem)] w-[126px] left-0 bg-white border rounded flex flex-col">
                      <div className="border text-[var(--primary-blue)] px-4 py-2">
                        Share
                      </div>
                      <div
                        className="border text-[var(--indicator-blue)] px-4 py-2"
                        onClick={() => {
                          setReplyTo(mail.id)
                          setActiveActionId(null)
                        }}
                      >
                        Reply
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

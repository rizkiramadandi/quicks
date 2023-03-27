import { ReactComponent as PersonIcon } from '../../../assets/icon/social/person_24px.svg'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveChatId } from '../reducers/activeChatReducer'
import { useCallback } from 'react'

export default function Inbox({ inbox, idx }) {
  const inboxes = useSelector((state) => state.inbox.inboxes)
  const dispatch = useDispatch()

  const getParticipantsInitial = useCallback(
    (inbox) => {
      let names = inbox.mails
        .map((mail) => mail.from)
        .filter((name) => name !== null && name)
      if (names.length > 0) return names[0][0].toUpperCase()
      return '?'
    },
    [inboxes],
  )

  const latestMail = useCallback(
    (inbox) => {
      return inbox.mails
        .slice()
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(-1)[0]
    },
    [inboxes],
  )

  return (
    <>
      <div key={inbox.id}>
        {idx > 0 ? (
          <hr
            key={`divider-${idx}`}
            className="my-4 bg-[var(--primary-grey)]"
          />
        ) : (
          <></>
        )}
        <div
          className="flex gap-6 hover:cursor-pointer"
          onClick={() => dispatch(setActiveChatId(inbox.id))}
        >
          <div className="relative w-[34px]">
            {/* check if participants are more than or equal to 3 */}
            {Array.from(new Set(inbox.mails.map((mail) => mail.from))).length >=
            3 ? (
              <>
                <div className="bg-[var(--primary-light)] rounded-full flex items-center justify-center aspect-square w-[34px] h-[34px] p-[11px] relative translate-x-[-25%]">
                  <PersonIcon className="w-[12px] h-[12px]" fill="#4F4F4F" />
                </div>
                <div className="bg-[var(--primary-blue)] rounded-full flex items-center justify-center aspect-square w-[34px] h-[34px] p-[11px] absolute top-0 left-0 translate-x-[25%]">
                  <PersonIcon className="w-[12px] h-[12px]" />
                </div>
              </>
            ) : (
              <>
                <div className="bg-[var(--primary-blue)] rounded-full flex items-center justify-center aspect-square w-[34px] h-[34px] p-[11px] relative text-[12px] font-bold text-[var(--primary-light)]">
                  {getParticipantsInitial(inbox)}
                </div>
              </>
            )}
          </div>

          <div className="flex gap-1 flex-col w-full">
            <div className="flex items-center gap-4">
              <div className="font-bold text-[var(--primary-blue)] text-[16px] line-clamp-2 leading-6">
                {inbox.title}
              </div>
              <div className="whitespace-nowrap self-start">
                {latestMail(inbox).date}
              </div>
            </div>

            <div>
              <div className="font-bold">
                {latestMail(inbox).from || 'You'}:
              </div>
              <div className="flex gap-4 items-center">
                <p className="line-clamp-1">{latestMail(inbox).content}</p>
                {latestMail(inbox).isRead === false ? (
                  <div className="w-fit ml-auto">
                    <span className="block w-[10px] h-[10px] bg-[var(--indicator-red)] rounded-full"></span>
                  </div>
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

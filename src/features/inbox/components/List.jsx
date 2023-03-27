import { useEffect, useMemo, useState } from 'react'

import { ReactComponent as SearchIcon } from '../../../assets/icon/action/search_24px.svg'

import { useSelector } from 'react-redux'

import Loader from '../../../components/Loader'
import Inbox from './Inbox'

export default function List() {
  const inboxes = useSelector((state) => state.inbox.inboxes)

  const [isLoaded, setIsLoaded] = useState(false)
  const [search, setSearch] = useState('')

  const filteredInboxes = useMemo(() => {
    return inboxes.filter(inbox => {
      if(inbox.title.toLowerCase().includes(search.toLowerCase()) || (inbox.mails.map(mail => mail.content)).join(` `).toLowerCase().includes(search.toLowerCase())) {
        return inbox
      }
    })
  }, [search, inboxes])

  useEffect(() => {
    // simulate loading for 1000 miliseconds before render all inboxes
    setTimeout(() => {
      setIsLoaded(true)
    }, 1000)
  }, [])

  return (
    <>
      <div className="p-[24px_32px] flex flex-col gap-[22px] h-full">
        <div className="flex border px-[4rem] py-2 items-center border-[var(--primary-grey)]">
          <input
            type="text"
            className="bg-transparent w-full text-[var(--background)] placeholder:text-[var(--background)]"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchIcon
            className="w-[var(--text-sm)] h-[var(--text-sm)]"
            fill="#333333"
          />
        </div>

        {isLoaded ? (
          <div className="max-h-[calc(100%-48px-37px)] overflow-y-auto flex flex-col gap-4 px-[1rem]">
            {filteredInboxes.map((inbox, idx) => {
              return (
                <Inbox key={inbox.id} inbox={inbox} idx={idx} />
              )
            })}
          </div>
        ) : (
          <>
            <Loader subtitle={'Chats'} />
          </>
        )}
      </div>
    </>
  )
}

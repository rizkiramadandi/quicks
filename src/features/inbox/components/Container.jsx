import InboxList from './List'
import InboxDetail from './Detail'
import FloatingModal from '../../../components/FloatingModal'
import { shallowEqual, useSelector } from 'react-redux'

export default function Container() {
  const activeChatId = useSelector((state) => state.activeChat.activeChatId, shallowEqual)

  return (
    <>
      {activeChatId != null ? (
        <FloatingModal Component={InboxDetail} />
      ) : (
        <FloatingModal Component={InboxList} />
      )}
    </>
  )
}

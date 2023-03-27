import TaskList from '../../task/components/List'
import FloatingModal from '../../../components/FloatingModal'

export default function Container() {
  return (
    <>
      <FloatingModal Component={TaskList} />
    </>
  )
}

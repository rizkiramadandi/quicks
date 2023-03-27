import { fetchPosts } from '../../../data/fetchData'

import { v4 as uuidv4 } from 'uuid'
import { dateFormatter, randomDate } from '../../../utilities/dateUtils'

export async function todosInitialState() {
  let state = []

  let posts = await fetchPosts()

  let now = new Date()

  // todos count
  for (let i = 0; i < Math.floor(Math.random() * 99) + 1; i++) {
    let isDone = Math.random() > 0.5 ? true : false
    state.push({
      id: uuidv4(),
      name: posts[Math.floor(Math.random() * posts.length)].title,
      description: posts[Math.floor(Math.random() * posts.length)].body,
      deadline: dateFormatter(
        randomDate(
          new Date(now.setMonth(now.getMonth() - 3)),
          new Date(now.setMonth(now.getMonth() + 6)),
        ),
        `YYYY-MM-DD`,
      ),
      isDone: isDone,
      label: [],
      isCollapsed: !isDone,
    })
  }

  return state
}

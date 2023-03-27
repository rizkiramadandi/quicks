import { v4 as uuidv4 } from 'uuid'

import { dateFormatter, randomDate } from '../../../utilities/dateUtils'

import { fetchPosts, fetchUsers } from '../../../data/fetchData'

export async function inboxInitialState() {
  let state = []

  let users = await fetchUsers()
  let posts = await fetchPosts()

  let now = new Date()

  // inbox counts
  for (let i = 0; i < Math.floor(Math.random() * 99) + 1; i++) {
    let obj = {
      id: uuidv4(),
      title: posts[Math.floor(Math.random() * posts.length)].title,
      mails: [],
    }

    for (let j = 0; j < Math.floor(Math.random() * 999) + 1; j++) {
      let randomUser = users.data[Math.floor(Math.random() * users.data.length)]
      obj.mails.push({
        id: uuidv4(),
        from:
          Math.random() >= 0.25
            ? `${randomUser.first_name} ${randomUser.last_name}`
            : null,
        date: dateFormatter(
          randomDate(new Date(now.setMonth(now.getMonth() - 1)), new Date()),
          `YYYY-MM-DD hh:mm:ss`,
        ),
        content: posts[Math.floor(Math.random() * posts.length)].body,
        isRead: false,
        replyTo: null,
      })
    }

    state.push(obj)
  }

  return state
}

import axios from 'axios'

export async function fetchPosts() {
  let res = await axios.get('https://jsonplaceholder.typicode.com/posts')

  return res.data
}

export async function fetchUsers() {
  let res = await axios.get('https://reqres.in/api/users')

  return res.data
}

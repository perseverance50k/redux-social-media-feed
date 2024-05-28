import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { postAdded } from './postsSlice'

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  const dispatch = useDispatch()

  const users = useSelector((state) => state.users)

  const titleChangeHandler = (e) => setTitle(e.target.value)
  const contentChangeHandler = (e) => setContent(e.target.value)
  const authorChangeHandler = (e) => setUserId(e.target.value)

  const savePostClickHandler = () => {
    if (title && content) {
      dispatch(postAdded(title, content, userId))
      setTitle('')
      setContent('')
    }
  }

  const allowedToSave = Boolean(title) && Boolean(content) && Boolean(userId)

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add post</h2>
      <form>
        <label htmlFor="postTitle">Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={titleChangeHandler}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={authorChangeHandler}>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={contentChangeHandler}
        />
        <button
          type="button"
          onClick={savePostClickHandler}
          disabled={!allowedToSave}
        >
          Save Post
        </button>
      </form>
    </section>
  )
}

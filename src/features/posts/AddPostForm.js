import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addNewPost } from './postsSlice'

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const dispatch = useDispatch()

  const users = useSelector((state) => state.users)

  const titleChangeHandler = (e) => setTitle(e.target.value)
  const contentChangeHandler = (e) => setContent(e.target.value)
  const authorChangeHandler = (e) => setUserId(e.target.value)

  const allowedToSave =
    [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

  const savePostClickHandler = async () => {
    if (allowedToSave) {
      try {
        setAddRequestStatus('pending')
        await dispatch(addNewPost({ title, content, user: userId })).unwrap()
        setTitle('')
        setContent('')
        setUserId('')
      } catch (e) {
        console.error('Failed to save the post: ', e)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

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

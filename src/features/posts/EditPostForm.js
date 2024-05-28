import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { postUpdated } from './postsSlice'

export const EditPostForm = ({ match }) => {
  const { postId } = match.params

  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId),
  )

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const dispatch = useDispatch()
  const history = useHistory()

  const titleChangeHandler = (e) => setTitle(e.target.value)
  const contentChangeHandler = (e) => setContent(e.target.value)

  const savePostClickHandler = () => {
    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content }))
      history.push(`/posts/${postId}`)
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={titleChangeHandler}
        />
        <label htmlFor="postContent">Post Content</label>
        <textarea
          id="postTitle"
          name="postTitle"
          value={content}
          onChange={contentChangeHandler}
        />
        <button type="button" onClick={savePostClickHandler}>
          Save Post
        </button>
      </form>
    </section>
  )
}

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { postUpdated, selectPostById } from './postsSlice'

export const EditPostForm = ({ match }) => {
  const { postId } = match.params

  const post = useSelector((state) => selectPostById(state, postId))

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

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
          id="postContent"
          name="postContent"
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

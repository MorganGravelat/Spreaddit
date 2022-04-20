import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editPost } from "../../store/post";
import './PostEdit.css';

function PostEdit() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user_id = useSelector((state) => state.session?.user.id);
  const { postId } = useParams();
  const Cpost = useSelector((state) => state?.post.selected[postId]);
    console.log(Cpost);
  const [title, setTitle] = useState(``);
  const [post, setPost] = useState(``);
  const [image_url, setImage_Url] = useState(``);
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);


  // Form Validations:
  useEffect(() => {
    let errors = [];
    if (title) {
      if (title.length === 0 || title.length > 100) errors.push('Please enter a value for title between 1 - 100 characters.')
    }
    if (!title) errors.push('Please enter a value for Title.')
    if (!post) errors.push('Please enter a post.')
    if (image_url) {
      if (image_url.length > 255) errors.push('Image URL must be shorter than 255 characters.')
    }
    if (!image_url) errors.push('Please enter a URL for image_url.')
    setErrors(errors);
  }, [title, post, image_url])

  const updateTitle = (e) => setTitle(e.target.value);
  const updatePost = (e) => setPost(e.target.value);
  const updateImage = (e) => setImage_Url(e.target.value);


  const handleSubmit = async (e) => {
    let id = postId
    e.preventDefault();
    setHasSubmitted(true);
    if (errors.length) return alert('Error Submitting.')
    const payload = {
      id,
      title,
      post,
      image_url,
      user_id
    };
    let createdPost
    try {
      createdPost = await dispatch(editPost(payload));
    } catch (error) {
      console.log("There is an error")
    }
    if (createdPost) {
      console.log(createdPost);
      setHasSubmitted(false);
      //history.push(`/posts/${createdPost.id}`)
      history.push(`/posts/${postId}`)
    }
  };

  return (
    <section className="new-form-holder centered middled">
      {hasSubmitted && errors?.map((error) => (
        <p style={{color: 'red', margin:"0px"}}>{error}</p>
      ))}
      <form className="create-post-form" onSubmit={handleSubmit}>
        <div className="create-input-container">
          <label className="create-form-text" htmlFor="title">Title: </label>
          <div>
            <input
              className="create-form-input"
              type="text"
              name="title"
              placeholder="Enter a nice title for your post"
              value={title}
              onChange={updateTitle}
            />
          </div>
        </div>
        <div className="create-input-container">
          <label className="create-form-text" htmlFor="img">Image URL: </label>
          <div>
            <input
              className="create-form-input"
              type="text"
              name="img"
              placeholder="Image URL"
              value={image_url}
              onChange={updateImage}
            />
          </div>
        </div>
        <div className="create-input-container">
          <label className="create-form-text" htmlFor="desc">Post: </label>
          <div>
            <textarea className="create-post-post"
              name="desc"
              placeholder="Write something for your post"
              value={post}
              onChange={updatePost}
            />
          </div>
        </div>
        <button className="create-new-post-button" type="submit">Create new Post</button>
      </form>
    </section>
  );
};

export default PostEdit;

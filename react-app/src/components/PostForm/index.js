import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addPost } from "../../store/post";
import FooterComponent from "../SplashPage/footer";
import './PostForm.css';

function PostForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user_id = useSelector((state) => state.session?.user.id)

  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [image_url, setImage_Url] = useState('https://i.imgur.com/FrP2U39.png')
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);


  // Form Validations:
  useEffect(() => {
    let errors = [];
    if (title) {
      if (title.length === 0 || title.length > 20) errors.push('Please enter a value for title between 1 - 20 characters.')
    }
    if (!title) errors.push('Please enter a value for Title.')
    if (post) {
        if (post.length === 0 || title.length > 200) errors.push('Please enter a value for post between 1 - 200 characters.')
      }
    if (!post) errors.push('Please enter a post.')
    if (image_url) {
      if (image_url.length > 255) errors.push('Image URL must be shorter than 255 characters.')
    }
    if (!image_url) errors.push('Please enter a URL for image_url.')
    setErrors(errors);
  }, [title, post, image_url])

  const updateTitle = (e) => setTitle(e.target.value);
  const updatePost = (e) => setPost(e.target.value);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (errors.length) return
    const payload = {
      title,
      post,
      image_url,
      user_id
    };
    let createdPost
    try {
      createdPost = await dispatch(addPost(payload));
    } catch (error) {
      console.log("There is an error")
    }
    if (createdPost) {
      setHasSubmitted(false);
      history.push(`/`)
    }
  };

  return (<>
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
              required
              placeholder="Enter a nice title for your post"
              value={title}
              onChange={updateTitle}
            />
          </div>
        </div>
        <div className="create-input-container">
          <label className="create-form-text" htmlFor="desc">Post: </label>
          <div>
            <textarea className="create-post-post"
              name="desc"
              required
              style={{resize: 'none'}}
              placeholder="Write something for your post"
              value={post}
              onChange={updatePost}
            />
          </div>
        </div>
        <button className="create-new-post-button" type="submit">Create new Post</button>
      </form>
    </section>
    <FooterComponent />
    </>
  );
};

export default PostForm;

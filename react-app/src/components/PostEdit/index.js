import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editPost } from "../../store/post";
import FooterComponent from "../SplashPage/footer";
import './PostEdit.css';

function PostEdit() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user_id = useSelector((state) => state.session?.user.id);
  const { postId } = useParams();
  const Cpost = useSelector((state) => state?.post?.selected[postId]);
  const [title, setTitle] = useState(`${Cpost?.title}`);
  const [post, setPost] = useState(`${Cpost?.post}`);
  const [image_url, setImage_Url] = useState(`https://drive.google.com/uc?id=1ByCZAWUacphPcirbMaTDxjnIPKI8NvGW`);
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
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

  useEffect(() => {
    if (typeof Cpost === 'undefined') {
        history.push(`/`)
    }
  }, [title, post, Cpost, history])

  const updateTitle = (e) => setTitle(e.target.value);
  const updatePost = (e) => setPost(e.target.value);


  const handleSubmit = async (e) => {
    let id = postId
    e.preventDefault();
    setHasSubmitted(true);
    if (errors.length) return
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
      setHasSubmitted(false);
      //history.push(`/posts/${createdPost.id}`)
      history.push(`/posts/${postId}`)
    }
  };
  return (<>
    <section className="new-form-holder centered middled">
      {hasSubmitted && errors?.map((error) => (
        <p style={{color: 'red', margin:"0px"}}>{error}</p>
      ))}
      <form className="create-post-form-edit" onSubmit={handleSubmit}>
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
              required
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
              required
              onChange={updatePost}
            />
          </div>
        </div>
        <button className="create-new-post-button" type="submit">Edit this post</button>
      </form>
    </section>
    <FooterComponent />
    </>
  );
};

export default PostEdit;

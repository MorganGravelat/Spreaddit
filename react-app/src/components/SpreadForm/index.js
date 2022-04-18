import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addSpread, addSpreadUser, checkSpreadedPosts, addSpreadPost } from "../../store/spread";
import './SpreadForm.css';

function SpreadForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user_id = useSelector((state) => state.session?.user.id)
  const spreaded = useSelector((state) => state?.spread?.spreaded)

  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [title, setTitle] = useState("");
  const [image_url, setImage_Url] = useState('https://drive.google.com/uc?id=1FU5VA1G8mJoY8q7NSuBwYZpV-1UOHLv3');

  useEffect(() => {
    dispatch(checkSpreadedPosts(user_id))
  }, [dispatch])
  let postsArr = [];
  let postfilterArr = [];
  postsArr = Object.values(spreaded);
  for (let i = 0; i < postsArr.length; i++) {
      let ele = postsArr[i];
      if (!postfilterArr.includes(ele.post_id)) {
          postfilterArr.push(ele.post_id)
      }
  }

  console.log(spreaded,"THIS IS LIST OF POSTS SPREADED BY THIS USER");
  useEffect(() => {
    let errors = [];
    if (title) {
      if (title.length === 0 || title.length > 100) errors.push('Please enter a value for title between 1 - 100 characters.')
    }
    if (!title) errors.push('Please enter a value for Title.')
    if (image_url) {
      if (image_url.length > 255) errors.push('Image URL must be shorter than 255 characters.')
    }
    if (!image_url) errors.push('Please enter a URL for image_url.')
    setErrors(errors);
  }, [title, image_url])

  const updateTitle = (e) => setTitle(e.target.value);
  const updateImage = (e) => setImage_Url(e.target.value);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (errors.length) return alert('Error Submitting.')
    const payload = {
      title,
      image_url,
      user_id,
    };
    let createdSpread
    try {
      createdSpread = await dispatch(addSpread(payload));
    } catch (error) {
      console.log("There is an error")
    }
    let spread_id = createdSpread?.id
    let oPayload = {
        user_id,
        spread_id,
    }
    //let postUser;
    try {
        await dispatch(addSpreadUser(oPayload))
    } catch (error) {
        console.log("There is an error")
    }
    if (createdSpread) {
        console.log(createdSpread);
        setHasSubmitted(false);
        //spreaded_posts
        for (let i = 0; i < postfilterArr.length; i++) {
            let post_id = postfilterArr[i];
            let pPayload = {
                  spread_id,
                  post_id,
                  user_id
            }
            dispatch(addSpreadPost(pPayload));
        }
      history.push(`/`)
    }
  };

  return (
    <section className="new-form-holder centered middled">
      {hasSubmitted && errors?.map((error) => (
        <p style={{color: 'red', margin:"0px"}}>{error}</p>
      ))}
      <form className="create-spread-form" onSubmit={handleSubmit}>
        <div className="create-input-container">
          <label className="create-form-text" htmlFor="title">Title: </label>
          <div>
            <input
              className="create-form-input"
              type="text"
              name="title"
              placeholder="Enter a nice title for your spread"
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
        <button className="create-new-spread-button" type="submit">Create new spread</button>
      </form>
    </section>
  );
};

export default SpreadForm;

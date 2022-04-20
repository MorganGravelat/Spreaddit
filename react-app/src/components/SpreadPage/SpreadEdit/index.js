import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editSpread, checkSpreadedPosts, getSpread} from "../../../store/spread";

function SpreadEdit() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user_id = useSelector((state) => state.session?.user.id)
  const spreaded = useSelector((state) => state?.spread?.spreaded)
  const { spreadId } = useParams();
  const Uspread = useSelector((state => state?.spread?.selected[spreadId]));
  console.log(Uspread, 'WHY THIS NO WORK?')
  let spread = Uspread
  console.log(spread,'YOYOYO DELETE ME LATER ALRIGHT FOLKS?')
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  let [title, setTitle] = useState(``);
  let [image_url, setImage_Url] = useState(``);

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

  useEffect( () => {
    dispatch(checkSpreadedPosts(user_id))
    dispatch(getSpread(spreadId))
  }, [dispatch, user_id, spreadId])
  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (errors.length) return alert('Error Submitting.')
    const payload = {
      title,
      image_url,
    };
    try {
      await dispatch(editSpread(payload, spreadId));
    } catch (error) {
      console.log("There is an error")
    }

    setHasSubmitted(false);
    history.push(`/`)
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
        <button className="create-new-spread-button" type="submit">Edit spread</button>
      </form>
    </section>
  );
};

export default SpreadEdit;

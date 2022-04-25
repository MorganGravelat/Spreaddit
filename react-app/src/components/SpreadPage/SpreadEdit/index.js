import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editSpread, checkSpreadedPosts, getSpread} from "../../../store/spread";
import FooterComponent from "../../SplashPage/footer";

function SpreadEdit() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user_id = useSelector((state) => state.session?.user.id)
  const spreaded = useSelector((state) => state?.spread?.spreaded)
  const { spreadId } = useParams();
  const Uspread = useSelector((state => state?.spread?.selected[spreadId]));
  let spread = Uspread
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  let [title, setTitle] = useState(`${Uspread?.title}`);
  let [image_url, setImage_Url] = useState(`https://drive.google.com/uc?id=1hdlg-ADLqiiP4gxnBkApcGugkNoLMlSr`);

  let postsArr = [];
  let postfilterArr = [];
  postsArr = Object.values(spreaded);
  for (let i = 0; i < postsArr.length; i++) {
      let ele = postsArr[i];
      if (!postfilterArr.includes(ele.post_id)) {
          postfilterArr.push(ele.post_id)
      }
  }

  useEffect(() => {
    let errors = [];
    if (title) {
      if (title.length === 0 || title.length > 26) errors.push('Please enter a value for title between 1 - 26 characters.')
    }
    if (!title) errors.push('Please enter a value for Title.')
    if (image_url) {
      if (image_url.length > 255) errors.push('Image URL must be shorter than 255 characters.')
    }
    if (!image_url) errors.push('Please enter a URL for image_url.')
    setErrors(errors);
  }, [title, image_url])

  const updateTitle = (e) => setTitle(e.target.value.toUpperCase());

  useEffect( () => {
    dispatch(checkSpreadedPosts(user_id))
    dispatch(getSpread(spreadId))
  }, [dispatch, user_id, spreadId])
  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (errors.length) return
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
    history.push(`/spread/${spreadId}`)
    };

    useEffect(() => {
        if (typeof Uspread === 'undefined') {
            history.push(`/`)
        }
      }, [title])

  return (<>
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
              required
              placeholder="Enter a nice title for your spread"
              value={title}
              onChange={updateTitle}
            />
          </div>
        </div>
        <button className="create-new-spread-button" type="submit">Edit spread</button>
      </form>
    </section>
    <FooterComponent />
    </>
  );
};

export default SpreadEdit;

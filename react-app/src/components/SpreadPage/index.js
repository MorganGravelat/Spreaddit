import React, { useEffect } from "react";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSpreadPosts, getSpread, deleteSpread } from "../../store/spread";
import Modal from "react-modal"
import PostCard from "../PostCard";
import SpreadFriends from "./SpreadFriends";
import "./SpreadPage.css"

const SpreadPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spreadId } = useParams();
    const currentUser = useSelector((state) => state.session.user);
    const posts = useSelector((state) => state?.spread.posts);
    const spread = useSelector((state => state?.spread.selected[spreadId]));
    const [modalIsOpen, setIsOpen] = React.useState(false);
    let postsArr = [];
    let filteredvar = [];
    let postfilterArr = [];
    postsArr = Object.values(posts);
    for (let i = 0; i < postsArr.length; i++) {
        let ele = postsArr[i];
        if (!postfilterArr.includes(ele.post_id)) {
            postfilterArr.push(ele.post_id)
            filteredvar.push(ele)
        }
    }


    const openModal = () => {
        setIsOpen(true);
        return;
    }

    const closeModal = () => {
        setIsOpen(false);
        return
    }

    useEffect(() => {
      dispatch(getSpreadPosts(spreadId));
      dispatch(getSpread(spreadId))
    }, [dispatch, spreadId]);

    const showButtons = () => {
        if (!currentUser) return;
        if (currentUser?.id === spread?.user_id) {
            return (
                <div className="Post-btns">
                    <NavLink className="Spread-Lower-btn" exact to={`/spread/edit/${spread?.id}`}>
                        Edit
                    </NavLink>
                    {deleteButtons()}
                </div>
            )
        } else {
            return (
                <>
                </>
            );
        }
    }

    const destroySpreadButton = async (e) => {
        e.preventDefault();
        const payload = {
            userId: currentUser?.id,
            id: spread?.id,
        }
        let destroyedSpread;
        try {
            destroyedSpread = await dispatch(deleteSpread(payload))
        } catch (error) {
            console.log("error in delete")
        }
        console.log("RAGURAGURAGURAGU",destroyedSpread)
        if (destroyedSpread?.id) {
            history.push("/");
        }
    }
    const deleteButtons = () => {
        if (modalIsOpen === true) {
            return (
                <Modal
                        ariaHideApp={false}
                        style={{ overlay: { backgroundColor: "rgba(68,68,68,.3"} }}
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        className="delete-post-modal"
                    >
                <>
                    <div className="h2-delete-prompt">
                    <h2>Are you sure you want to delete your post?</h2>
                    </div>
                    <div className="Delete-confirm-btn" type="submit" onClick={destroySpreadButton} >
                        DELETE
                    </div>
                    <div className="Delete-cancel-btn" onClick={() => {closeModal();}}>
                        Cancel
                    </div>
                </>
                </Modal>
            )
        }
        else {
            return (
                <>
                  <div className="Spread-Lower-btn" onClick={() => {openModal();}}>Delete</div>
                </>
            );
        }
    }

  const postListMap = () => {
    if (posts !== undefined) {
      postsArr = Object.values(posts);
      return (
        <div className="spread-post-container">
          {filteredvar?.map((post) => (
            <PostCard key={post?.id} post={post ? post : null} />
          ))}
        </div>
      );
    }
  };

  return (
    <div className='control-spread-div'>
        <h1 className="spread-title-h1">{`${spread?.title}`}</h1>
        <div>{showButtons()}</div>
        <SpreadFriends spreadId={spreadId} spread={spread} />
      <img alt={`${spread?.title}`} className="spread-image-img"src={`${spread?.image_url}`} />
      <div className="post-spread-list-container">
        {postListMap()}
      </div>
    </div>
  );
};

export default SpreadPage;

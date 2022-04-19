import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { getPost, deletePost } from "../../store/post";
import { addSpreadPost, checkSpreaded, unSpread } from "../../store/spread";
import { isFriendCheck, addFriend } from "../../store/friend";
import ProfileButton from '../ProfileButton';
import SpreadPost from "../Util/SpreadPost"
import Modal from "react-modal"
import Spreads from "./Spread";
import Friends from "./Friend";
import './PostPage.css';

function PostPage() {

    const dispatch = useDispatch();
    const history = useHistory();
    const { postId } = useParams();
    const currentUser = useSelector((state) => state?.session?.user);
    let user_id = currentUser?.id
    let post_id = postId;
    const spreads = useSelector((state) => state?.spread?.spreads);
    const post = useSelector((state) => state?.post?.selected[postId]);
    let post_user_id = post?.user_id
    const FriendCheck = useSelector((state) => state?.friend?.check[0]);
    let decider = true;
    if (FriendCheck === "False") {
        decider = false;
    }
    if (FriendCheck === "True") {
        decider = true;
    }

    let checkVar = useSelector((state) => state?.spread?.check);
    let spreaded;
    console.log(checkVar, 'LET US SEE')
    let cPost = {...post}
    const [modalIsOpen, setIsOpen] = React?.useState(false);
    //const [deletePrompt, setDeletePrompt] = useState(false);
    useEffect(()=> {
        dispatch(checkSpreaded(post_id,user_id))
        dispatch(isFriendCheck({'user_id':user_id, 'friend_id':post_user_id}))
    }, [dispatch, post, post_id, user_id, decider])
    const hasSpreaded = () => {
        if (checkVar?.checks?.length) {
            spreaded = true;
            console.log(spreaded, checkVar)
        }
        if (!checkVar?.checks?.length) {
            spreaded = false;
            console.log(spreaded)
        }
    }
    hasSpreaded();
    const openModal = () => {
        setIsOpen(true);
        return;
    }
    useEffect( ()=> {
        hasSpreaded();
    }, [spreaded,checkVar,hasSpreaded])

    const closeModal = () => {
        setIsOpen(false);
        return
    }
    useEffect(() => {
        dispatch(getPost(postId))
    }, [dispatch, post_id]);

    const spreadPost = (currentUser,postId,spreads) => {
        user_id = currentUser?.id;
        post_id = postId;
        if (checkVar?.checks?.length) {
            console.log(checkVar,'something is broken you are viewing the spread')
        } else {
                let spreadIdArr = SpreadPost(user_id,post_id,spreads);
            for (let i = 0; i < spreadIdArr.length; i++) {
                let spread_id = spreadIdArr[i];
                const payload = {
                    spread_id,
                    post_id,
                    user_id,
                };
                dispatch(addSpreadPost(payload));
                dispatch(checkSpreaded(post_id,user_id));
                spreaded=true;
            }
        }
    }
    const add_friend = () => {
        if (!currentUser) {
            return false;
        }
        if (parseInt(user_id) === parseInt(post_user_id)) {
            return false;
        }
        if (decider) {
            return false;
        }
        return true;
    }
    const handleAdd = () => {
            // e.preventDefault();
            const payload = {
                requestee_id: post_user_id,
                requester_id: user_id
            };
            let createdPost;
            createdPost = dispatch(addFriend(payload));
            if (createdPost) {
                decider = true;
            }
    };
    const unspreadPost = (currentUser,postId,spreads) => {
        user_id = currentUser.id;
        post_id = postId;
        if (!checkVar.checks.length) {
            console.log(checkVar,'Something is broken, you are viewing the unspread')
        } else {
            dispatch(unSpread(post_id,user_id));
            spreaded=false;
        }
    }

    const showSpread = () => {
        if (currentUser) {
            if (spreaded) {
                return (
                    <div className="Post-btns">
                        <button onClick={() => {unspreadPost(currentUser, postId,spreads);}}>
                            Unspread!
                        </button>
                    </div>
                )
            } else {
                return (
                    <div className="Post-btns">
                        <button onClick={() => {spreadPost(currentUser, postId,spreads);}}>
                            Spread!
                        </button>
                    </div>
                )
            }

        } else {
            return (
                <>
                </>
            );
        }
    }
    const showButtons = () => {
        if (!currentUser) return;
        if (currentUser.id === cPost?.user_id) {
            return (
                <div className={"Post-btns"}>
                    <NavLink className="Post-Lower-btn" exact to={`/posts/edit/${cPost?.id}`}>
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

    //function for destroy
    const destroyPostButton = async (e) => {
        e.preventDefault();
        const payload = {
            userId: currentUser?.id,
            id: post?.id,
        }
        let destroyedPost;
        try {
            destroyedPost = await dispatch(deletePost(payload))
        } catch (error) {
            console.log("error in delete")
        }

        if (destroyedPost?.id) {
            history.push("/");
        }
    }

    //confirmation for user delete
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
                    <div className="Delete-confirm-btn" type="submit" onClick={destroyPostButton} >
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
                  <div className="Post-Lower-btn" onClick={() => {openModal();}}>Delete</div>
                </>
            );
        }
    }

    //prevents a 404 error on initial render
    const postDetail = () => {
        if (post === undefined) return null;
        else {
            return (
                <>
                    <div className="Post-Detail-div">
                        <h1 style={{margin: "0rem"}}>{post?.title}</h1>
                        <p style={{margin: ".5rem 0rem 3rem 0rem"}}>{post?.post}</p>
                    </div>
                </>
            )
        }
    }

    const postImage = () => {
        if (post === undefined) return null;
        else {
            return (
                <>
                    <div className="Post-Image-Container">
                        <img alt={`${post?.title}`} className="Post-Image" src={`${post?.image_url}`} />
                    </div>
                </>
            )
        }
    }

    return (
        <div className="main-container">
            <div className="Post-container">
                <div className="Post-detail-container">
                    {postDetail()}
                </div>
                <div className="Post-Lower-container">
                    {postImage()}
                    <div className="Post-Lower">
                        {showButtons()}
                        <Spreads postId={postId} postuser_id={post_user_id} currentUser={currentUser} />
                        <Friends user_id={user_id} post_user_id={post_user_id} currentUser={currentUser} />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PostPage;

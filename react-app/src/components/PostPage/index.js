import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { getFriendInfo } from "../../store/friend";
import { getPost, deletePost } from "../../store/post";
import { checkSpreaded } from "../../store/spread";
import { isFriendCheck } from "../../store/friend";
import Modal from "react-modal"
import Spreads from "./Spread";
import Friends from "./Friend";
import FooterComponent from "../SplashPage/footer";
import CommentsForm from "../Comment";
import './PostPage.css';

function PostPage() {

    const dispatch = useDispatch();
    const history = useHistory();
    const { postId } = useParams();
    const currentUser = useSelector((state) => state?.session?.user);
    let user_id = currentUser?.id
    let post_id = postId;
    //const spreads = useSelector((state) => state?.spread?.spreads);
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
    let cPost = {...post}
    const [modalIsOpen, setIsOpen] = React?.useState(false);
    //const [spreaded, setSpreaded] = useState(null);
    useEffect(()=> {
        (async() => {
            await dispatch(checkSpreaded(post_id,user_id));
            await dispatch(getFriendInfo(post_user_id))
            await dispatch(isFriendCheck({'user_id':user_id, 'friend_id':post_user_id}));
        })();
    }, [dispatch, post, post_id, user_id, decider, post_user_id]);
    const hasSpreaded = () => {
        if (checkVar?.checks?.length) {
            spreaded = true;
        }
        if (!checkVar?.checks?.length) {
            spreaded = false;
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
    }, [dispatch, post_id, postId]);


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
                        <h1 className="post-title-h1" style={{margin: "0rem"}}>{post?.title}</h1>
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
    if (!post) {
        return (
            <>
                <div className="404-not-found">
                    <div className="forofor-title-message"> 404 Page Not Found</div>
                    <div className='forofor-description-message'>
                        The page you requested could not be found, perhaps it does not exist, and you should not be here.
                    </div>
                </div>
                <FooterComponent />
            </>
        )
    }
    return (
        <div className="main-container">
            <div className="Post-container">
                <div className="Post-detail-container">
                    <div className='upper-post-div'>
                        {postDetail()}
                        {postImage()}
                    </div>
                </div>
                <div className="Post-Lower-container">
                    <div className="Post-Lower">
                        <Friends user_id={user_id} post_user_id={post_user_id} currentUser={currentUser} />
                        <Spreads postId={postId} postuser_id={post_user_id} currentUser={currentUser} />
                        {showButtons()}
                    </div>
                </div>
            </div>
            <FooterComponent />
            <CommentsForm postId={postId} />
        </div>
    );
};
export default PostPage;

import { NavLink } from "react-router-dom";
import { useState, useEffect  } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addLike, editLike, deleteLike } from "../../store/like";

const PostCard = ({post, likesCount, myLikes, likeInfo}) => {
    let isLiked = false;
    const dispatch = useDispatch();
    const user_id = useSelector((state) => state.session?.user?.id)
    let post_id;
    post.post_id ? post_id = post.post_id : post_id = post.id;
    let thisPostId;
    if (post.post_id) {
        thisPostId = post.post_id
        post_id = post.post_id
    }
    else {
        thisPostId = post.id
        post_id = post.id
    }
    let likeDecision;
    likeInfo[0] ? likeDecision = likeInfo[1] : likeDecision = 0;
    console.log('this is my like DECISION', likeDecision)
    const [likes, setLikes] = useState(likesCount);
    const [liked, setLiked] = useState(likeDecision)
    function liker() {
        //console.log(isLiked, 'WHAT IS LIKED AND NOT LIKED?');
        if (liked === 1) {
            setLiked(0);
            setLikes(likes-1);
            let newLike = {
                user_id,
                post_id,
            }
            dispatch(deleteLike(newLike));
        }
        if (liked === -1) {
            setLiked(1);
            setLikes(likes+2);
            let newLike = {
                user_id,
                post_id,
                liked: 1,
            }
            dispatch(editLike(newLike))
        }
        if (liked === 0) {
            setLiked(1);
            setLikes(likes+1);
            let newLike = {
                user_id,
                post_id,
                liked: 1,
            }
            dispatch(addLike(newLike))
        }
    }
    function disliker() {
        console.log(liked);
        if (liked === 1) {
            setLiked(-1);
            setLikes(likes-2);
            let newLike = {
                user_id,
                post_id,
                liked: -1,
            }
            dispatch(editLike(newLike))
        }
        if (liked === -1) {
            setLiked(0);
            setLikes(likes+1);
            let newLike = {
                user_id,
                post_id,
            }
            dispatch(deleteLike(newLike));
        }
        if (liked === 0) {
            setLiked(-1);
            setLikes(likes-1);
            let newLike = {
                user_id,
                post_id,
                liked: -1,
            }
            dispatch(addLike(newLike))
        }
    }

    console.log(likeInfo,'likeINFO IS HERE TO STAY!')
    return (
        <div className="post-div" key={post?.id}>
            {/* <div className="likes-bar">
                {user_id ? <button onClick={() => liker()} className={liked <= 0 ? 'like-button-deactivated' : 'like-button-selected'}><h1>👍</h1></button> : <></>}
                    <h1>{likes}</h1>
                {user_id ? <button onClick={() => disliker()} className={liked >= 0 ? 'dislike-button-deactivated' : 'dislike-button-selected'}><h1>👎</h1></button> : <></>}
            </div> */}
            <div className="post-detail-div">
              <NavLink  className="post-title"exact to={`/posts/${post.post_id ? post?.post_id : post?.id}`}>
                <h3 style={{margin: "10px 0px 0px 0px"}}>{post.title ? post?.title : post?.post_title}</h3>
              </NavLink>
              <NavLink className="post-description" exact to={`/posts/${post.post_id ? post?.post_id : post?.id}`}>
                {post.post ? post?.post : post?.post_post}
              </NavLink>
              <h1 className="username-h1">{post?.post_username ? `~${post?.post_username}` : `~${post?.post_username}`}</h1>
            </div>
            <div className='space-between' />
              <NavLink className="post-image-container" exact to={`/posts/${post.post_id ? post?.post_id : post?.id}`}>
                <img className="post-image" src={post.image_url ? post?.image_url : post?.post_image_url} alt="post" />
              </NavLink>
        </div>
    )
}

export default PostCard;

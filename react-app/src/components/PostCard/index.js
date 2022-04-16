import { NavLink } from "react-router-dom";

const PostCard = ({post}) => {
    return (
        <div className="post-div" key={post?.id}>
            <div className="likes-bar">
                <h1>👍</h1>
                <h1>10</h1>
                <h1>👎</h1>
            </div>
            <div className="post-detail-div">
              <NavLink  className="post-title"exact to={`/posts/${post.post_user_id ? post?.post_user_id : post?.id}`}>
                <h3 style={{margin: "10px 0px 0px 0px"}}>{post.title ? post?.title : post?.post_title}</h3>
              </NavLink>
              <NavLink className="post-description" exact to={`/posts/${post.post_user_id ? post?.post_user_id : post?.id}`}>
                {post.post ? post?.post : post?.post_post}
              </NavLink>
            </div>
            <div className='space-between' />
              <NavLink className="post-image-container" exact to={`/posts/${post.post_user_id ? post?.post_user_id : post?.id}`}>
                <img className="post-image" src={post.image_url ? post?.image_url : post?.post_image_url} alt="post" />
              </NavLink>
        </div>
    )
}

export default PostCard;

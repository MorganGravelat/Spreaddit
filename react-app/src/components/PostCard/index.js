import { NavLink } from "react-router-dom";

const PostCard = ({post}) => {
    return (
        <div className="post-div" key={post?.id}>
              <NavLink className="post-image-container" exact to={`/`}>
                <img className="post-image" src={post?.image_url} alt="post" />
              </NavLink>
              <NavLink  className="post-title"exact to={`/`}>
                <h3 style={{margin: "10px 0px 0px 0px"}}>{post?.title}</h3>
              </NavLink>
              <NavLink className="post-description" exact to={`/`}>
                {post?.post}
              </NavLink>
            </div>
    )
}

export default PostCard;

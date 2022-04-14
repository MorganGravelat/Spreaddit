import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../store/post";
import PostCard from "../PostCard";
import "./post-list.css"

const PostsList = ({}) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state?.post.posts);
    let postsArr = [];

    useEffect(() => {
      dispatch(getPosts());
    }, [dispatch]);

  const postListMap = () => {
    if (posts !== undefined) {
      postsArr = Object.values(posts);
      return (
        <>
          {postsArr?.map((post) => (
            <PostCard key={post?.id} post={post ? post : null} />

          ))}
        </>
      );
    }
  };

  return (
    <>
      <div className="post-list-container">
        {postListMap()}
      </div>
    </>
  );
};

export default PostsList;

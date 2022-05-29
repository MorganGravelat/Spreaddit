import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../store/post";
import { getPostLikes, userPostLikes } from "../../store/like";
import PostCard from "../PostCard";
import "./post-list.css"

const PostsList = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state?.post.posts);
    const user_id = useSelector((state) => state.session?.user?.id);
    const likes = useSelector((state) => state?.like.Plikes);
    const UserLikes = useSelector((state) => state?.like.Ulikes);
    console.log(UserLikes, likes, 'USER LIKES!!!');
    console.log('NOTICE THE LIKES INFORMATION OVER HERE',likes);
    // likedPosts
    // likedPostsDecisions

    let postsArr = [];

    useEffect(() => {
      dispatch(getPosts());
      dispatch(getPostLikes());
      dispatch(userPostLikes(user_id));
    }, [dispatch]);

  const postListMap = () => {
    if (posts !== undefined) {
      postsArr = Object.values(posts);
      return (
        <>
          {postsArr?.map((post) => (
            <PostCard key={post?.id} post={post ? post : null} likesCount={likes[post?.id] ? likes[post?.id] : 0} myLikes={likes} likeInfo={ UserLikes[post.id] ? UserLikes[post.id] : [false,false] }/>

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

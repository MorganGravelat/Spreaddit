import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments, createComments, deleteComments } from "../../store/comment";

import './postPage.css';

const CommentsForm = ({ postId }) => {
    const dispatch = useDispatch();
    console.log('HEY THERE LOOK AT ME?', postId)
    const user = useSelector((state) => state.session?.user)
    const comments = useSelector((state) => state.comment.comments)

    let user_id = user?.id
    let post_id = postId

    const [comment, setComment] = useState('');
    const updateComment = (e) => setComment(e.target.value);

    useEffect(() => {
        dispatch(getComments(postId))
    }, [dispatch, postId]);
    const commentSubmit = async (e) => {
        e?.preventDefault();
        const commentS = {
            comment,
            user_id,
            post_id,
          };
        await dispatch(createComments(commentS));
        await dispatch(getComments(postId));
        setComment('');
    }

    const commentDeletion = async (comment) => {
        await dispatch(deleteComments(comment));
        //await dispatch(getComments(postId));
    }


    return (
        <div className='view-post-comments-div'>
            <div className='written-comments-div'>
            {Object?.values(comments).map((comment) =>
            (<>
                <div className='comments-section-div' key={`div${comment?.id}`}>
                    <div>
                    <img className='comment-user-img' alt={`UserDisplay`}src={`${comment?.user_image}`} />
                    </div>
                    <div className='comments-section-info'>
                    <h3 className="review-comment-h3" key={`h3${comment?.id}`}>{`"${comment?.comment}"`}</h3>
                    <h2 key={`h2{comment.id}`}>{`~${comment?.post_username}`}</h2>
                    </div>
                </div>
                {comment?.user_id===user?.id ?
                (<><button onClick={()=>commentDeletion(comment)} className='comment-button delete-comment-button' key={`Dbutton${comment?.id}`}>DELETE ⇈</button></>
                ) :
                (<></>)}
            </>
            )
            )}
            </div>
            { user?.id && (
                <div>
                    <section className="comment-form-holder centered middled">
                        <form className="write-comment-form" onSubmit={commentSubmit}>
                            <textarea
                            placeholder="Write out a Comment"
                            wrap='soft'
                            required
                            value={comment}
                            onChange={updateComment}
                            />
                            <button type='submit' className="comment-button publish-comment-button">Publish Comment</button>
                        </form>
                    </section>
                </div>)}
        </div>

    );
};

export default CommentsForm;

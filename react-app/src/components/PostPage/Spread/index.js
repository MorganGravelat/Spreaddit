import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSpreadPost, checkSpreaded, unSpread } from "../../../store/spread";
import { useHistory } from "react-router-dom";
import SpreadPost from "../../Util/SpreadPost"


function Spreads({postId, postuser_id, currentUser}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const spreads = useSelector((state) => state?.spread?.spreads);
    let user_id = currentUser?.id
    let post_id = postId
    //let post_user_id = postuser_id
    let spreaded;
    let checkVar = useSelector((state) => state?.spread?.check);
    useEffect(()=> {
        (async() => {
            await dispatch(checkSpreaded(post_id,user_id))
        })();
    }, [dispatch, post_id, user_id, spreaded])

    const hasSpreaded = () => {
        if (checkVar?.checks?.length) {
            spreaded = true;
        }
        if (!checkVar?.checks?.length) {
            spreaded = false;
        }
    }
    hasSpreaded();
    const spreadPost = (currentUser,postId,spreads) => {
        user_id = currentUser?.id;
        post_id = postId;
        if (checkVar?.checks?.length) {
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
        history.push(`/profile-page`);
    }
    const unspreadPost = (currentUser,postId,spreads) => {
        user_id = currentUser.id;
        post_id = postId;
        if (!checkVar.checks.length) {
            return
        } else {
            dispatch(unSpread(post_id,user_id));
            spreaded=false;
        }
        history.push(`/profile-page`);
    }
    let spreadsArr = Object.values(spreads);
    if (!spreadsArr.length) {
        return(<></>)
    }
    const showSpread = () => {
        if (currentUser) {
            if (spreaded) {
                return (
                    <div className="Post-btns">
                        <button className="unspread-button" onClick={() => {unspreadPost(currentUser, postId,spreads);}}>
                            Unspread!
                        </button>
                    </div>
                )
            } else {
                return (
                    <div className="Post-btns">
                        <button className="spread-button" onClick={() => {spreadPost(currentUser, postId,spreads);}}>
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
    console.log(spreads,"my spreads?")
    return (<>{showSpread()}</>)
}

export default Spreads

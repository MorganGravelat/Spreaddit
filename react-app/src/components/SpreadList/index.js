import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSpreads } from "../../store/spread";
import SpreadCard from "../SpreadCard";
import "./SpreadList.css"

const SpreadsList = () => {
    const dispatch = useDispatch();
    const spreads = useSelector((state) => state?.spread?.spreads);
    const currentUser = useSelector((state) => state.session.user);
    let spreadsArr = [];
    spreadsArr = Object.values(spreads).slice(0,4);
    useEffect(() => {
      dispatch(getSpreads(currentUser.id));
    }, [dispatch, currentUser.id]);
    const spreadListMap = () => {
      if (spreads !== undefined) {
        return (
          <>
            {spreadsArr?.map((spread) => (
              <SpreadCard key={spread?.id} spread={spread ? spread : null} />
            ))}
          </>
        );
      }
    };

if (spreadsArr.length) {
    return (
        <>
            <div className="spreads-splash-div">
                <h2>Some of your spreads!</h2>
                <h6>View them all in your profile!</h6>
            </div>
            <div className="spread-list-container">
                {spreadListMap()}
            </div>
        </>
      );
    } else {
        return (
            <>
              <div className="spreads-splash-div">
                <h2>You have no spreads!</h2>
                <h6>Create one with the 'Create a spread' button in the top left</h6>
            </div>
            </>
          );
    }

};

export default SpreadsList;

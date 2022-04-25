import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSpreads } from "../../../store/spread";
import ProfileSpreadCard from "./ProfileSpreadCard";
import "./ProfileSpreadList.css"

const ProfileSpreadList = () => {
    const dispatch = useDispatch();
    const spreads = useSelector((state) => state?.spread?.spreads);
    const currentUser = useSelector((state) => state.session.user);
    let spreadsArr = [];

    useEffect(() => {
      dispatch(getSpreads(currentUser.id));
    }, [dispatch, currentUser.id]);
    const spreadListMap = () => {
      if (spreads !== undefined) {
        spreadsArr = Object.values(spreads);
        return (
          <div className="profile-spreads-list-container">
            {spreadsArr?.map((spread) => (
              <ProfileSpreadCard key={spread?.id} spread={spread ? spread : null} />
            ))}
          </div>
        );
      }
};
    spreadsArr = Object.values(spreads);
    if (spreadsArr.length) {
        return (
            <>
              <div className="spread-list-container">
                {spreadListMap()}
              </div>
            </>
          );
    } else {

        return (
          <div className="no-spread-alert">
          <h1>You dont have any spreads, click the 'Create a spread' button in the top left to start using them!</h1>
          </div>
        );
    }
};

export default ProfileSpreadList;

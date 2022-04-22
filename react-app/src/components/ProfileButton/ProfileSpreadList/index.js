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
    console.log(spreads, `SPREADSPREADSPREAD`)
    const spreadListMap = () => {
      if (spreads !== undefined) {
        spreadsArr = Object.values(spreads);
        return (
          <>
            {spreadsArr?.map((spread) => (
              <ProfileSpreadCard key={spread?.id} spread={spread ? spread : null} />
            ))}
          </>
        );
      }
};

  return (
    <>
      <div className="spread-list-container">
        {spreadListMap()}
      </div>
    </>
  );
};

export default ProfileSpreadList;

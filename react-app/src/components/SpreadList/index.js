import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSpreads } from "../../store/spread";
import SpreadCard from "../SpreadCard";
import "./SpreadList.css"

const SpreadsList = ({}) => {
    const dispatch = useDispatch();
    const spreads = useSelector((state) => state?.spread?.spreads);
    const currentUser = useSelector((state) => state.session.user);
    let spreadsArr = [];

    useEffect(() => {
      dispatch(getSpreads(currentUser.id));
    }, [dispatch]);
    console.log(spreads, `SPREADSPREADSPREAD`)
    const spreadListMap = () => {
      if (spreads !== undefined) {
        spreadsArr = Object.values(spreads).slice(0,4);
        return (
          <>
            {spreadsArr?.map((spread) => (
              <SpreadCard key={spread?.id} spread={spread ? spread : null} />
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

export default SpreadsList;

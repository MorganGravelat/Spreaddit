import { NavLink } from "react-router-dom";

const SpreadCard = ({spread, likesCount}) => {
    return (
        <div className="spread-card-container">
            <div className="spread-div" key={spread?.id}>
                  <NavLink className="spread-image-container" exact to={`/spread/${spread?.spread_id}`}>
                    <img className="spread-image" src={spread?.spread_image_url} alt="spread" />
                  </NavLink>
            </div>
            <div className="spread-div-title">
                <p>{spread.spread_title}</p>
            </div>
        </div>
    )
}

export default SpreadCard;

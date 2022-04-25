import { NavLink } from "react-router-dom";

const ProfileSpreadCard = ({spread}) => {
    return (
        <div className="profile-spread-card-container">
            <div className="profile-spread-div" key={spread?.id}>
                  <NavLink className="profile-spread-image-container" exact to={`/spread/${spread?.spread_id}`}>
                    <img className="profile-spread-image" src={spread?.spread_image_url} alt="spread" />
                  </NavLink>
                <div className="profile-spread-div-title">
                <p>{spread.spread_title}</p>
                </div>
                <NavLink className="profile-spread-view-button" exact to={`/spread/${spread?.spread_id}`}>
                    <h3>VIEW</h3>
                </NavLink>
            </div>
        </div>
    )
}

export default ProfileSpreadCard;

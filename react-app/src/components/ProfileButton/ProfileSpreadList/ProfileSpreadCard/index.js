import { NavLink } from "react-router-dom";

const ProfileSpreadCard = ({spread}) => {
    console.log(spread, 'THIS IST HE SPRAD YOU LLOOOK FOR MY CHILD')
    return (
        <div className="profile-spread-card-container">
            <div className="profile-spread-div" key={spread?.id}>
                  <NavLink className="profile-spread-image-container" exact to={`/spread/${spread?.spread_id}`}>
                    <img className="profile-spread-image" src={spread?.spread_image_url} alt="spread" />
                  </NavLink>
            </div>
            <div className="profile-spread-div-title">
                <p>{spread.spread_title}</p>
            </div>
        </div>
    )
}

export default ProfileSpreadCard;

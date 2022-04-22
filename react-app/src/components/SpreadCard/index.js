import { NavLink } from "react-router-dom";

const SpreadCard = ({spread}) => {
    console.log(spread, 'THIS IST HE SPRAD YOU LLOOOK FOR MY CHILD')
    return (
        <div className="spread-card-container">
            <div className="spread-div" key={spread?.id}>
                {/* <div className="likes-bar">
                    <h4>👍</h4>
                    <h4>10</h4>
                    <h4>👎</h4>
                </div> */}
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

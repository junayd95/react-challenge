import { Link } from "react-router-dom";
import Logo from '../Images/logohere.png';



function UserCard({ item }) {

    return (
        

        <Link
            to={{
                pathname: `/User/${item.id}`
            }}
            className={"card-margin align-left is-row is-card"}
        >
          

            <div className="is-50">
                <div className="image-container">
                    <img className="card-logo" src={Logo} alt="Logo" />
                </div>
            </div>
            <div className="is-50">
                <h3>{item.firstName} {item.lastName}</h3>
            </div>
        </Link>
    );
}

export default UserCard

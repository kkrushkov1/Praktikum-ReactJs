import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

export const CatalogItem = ({ game }) => {
    const { user } = useContext(AuthContext);

    return (
        <div className="allGames">
            <div className="allGames-info">
                <img src={game.imageUrl} />
                <h6>{game.category}</h6>
                <h2>{game.title}</h2>
                <Link to={`/catalog/${game.id}`} className="details-button">
                    Details
                </Link>
                {user.user && user.user.id === game.userId && (
                    <Link
                        style={{ marginLeft: "120px" }}
                        to={`/games/${game.id}/edit`}
                        className="details-button"
                    >
                        Edit
                    </Link>
                )}
            </div>
        </div>
    );
};

import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import * as gameService from "../../services/gameService";

export const GameDetails = () => {
    const { gameId } = useParams();
    const { user } = useContext(AuthContext);
    const [game, setGame] = useState("");

    useEffect(() => {
        gameService.getById(gameId).then((result) => {
            setGame(result);
        });
    }, [gameId]);

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>
                <p className="text">{game.summary}</p>

                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        <li className="comment">
                            <p>Content: I rate this one quite highly.</p>
                        </li>
                        <li className="comment">
                            <p>Content: The best game.</p>
                        </li>
                    </ul>
                    <p className="no-comment">No comments.</p>
                </div>

                {user.user && user.user.id === game.userId && (
                    <div className="buttons">
                        <Link to={`/games/${gameId}/edit`} className="button">
                            Edit
                        </Link>
                        <a href="#" className="button">
                            Delete
                        </a>
                    </div>
                )}
            </div>

            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form">
                    <textarea
                        name="comment"
                        placeholder="Comment......"
                        defaultValue={""}
                    />
                    <input
                        className="btn submit"
                        type="submit"
                        defaultValue="Add Comment"
                    />
                </form>
            </article>
        </section>
    );
};

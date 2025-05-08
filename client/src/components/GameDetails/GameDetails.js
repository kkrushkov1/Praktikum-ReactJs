import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { GameContext } from "../../contexts/GameContext";
import * as gameService from "../../services/gameService";
import * as commentService from "../../services/commentService";

export const GameDetails = () => {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { gameDelete } = useContext(GameContext);
    const [game, setGame] = useState("");
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState({
        username: user.user?.email,
        comment: "",
    });

    useEffect(() => {
        gameService.getById(gameId).then((result) => {
            setGame(result);
        });
    }, [gameId]);

    useEffect(() => {
        commentService.getByGameId(gameId).then((result) => {
            setComments(result);
        });
    }, [gameId]);

    const deleteGameHandler = async () => {
        const hasConfirm = window.confirm(
            `Are you sure you want to delete ${game.title} game?`
        );

        if (!hasConfirm) {
            return;
        }
        await gameService.deleteById(gameId); // don't use result
        gameDelete(gameId);
        navigate("/");
    };

    const addCommentHandler = async (e) => {
        e.preventDefault();

        const newComment = {
            text: comment.comment,
            gameId: gameId,
            userName: user.user?.email,
        };

        const savedComment = await commentService.createComment(newComment);

        setComments((prevComments) => [...prevComments, savedComment]);

        setComment((prev) => ({ ...prev, comment: "" }));
    };

    const onChange = (e) => {
        setComment((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

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
                        {comments?.map((x) => (
                            <li className="comment" key={x.id}>
                                <p>
                                    <strong>{x.userName}</strong> : {x.text}
                                </p>
                            </li>
                        ))}
                    </ul>
                    {!comments && <p className="no-comment">No comments.</p>}
                </div>

                {user.user && user.user.id === game.userId && (
                    <div className="buttons">
                        <Link to={`/games/${gameId}/edit`} className="button">
                            Edit
                        </Link>
                        <button className="button" onClick={deleteGameHandler}>
                            Delete
                        </button>
                    </div>
                )}
            </div>

            {user.user?.id && (
                <article className="create-comment">
                    <label>Add new comment:</label>
                    <form className="form" onSubmit={addCommentHandler}>
                        <textarea
                            name="comment"
                            placeholder="Comment......"
                            onChange={onChange}
                            value={comment.comment}
                        />
                        <input
                            className="btn submit"
                            type="submit"
                            value="Add Comment"
                        />
                    </form>
                </article>
            )}
        </section>
    );
};

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../../contexts/GameContext";
import * as gameService from "../../services/gameService";

export const CreateGame = ({}) => {
    const { gameAdd } = useContext(GameContext);
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [maxLevel, setMaxLevel] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [summary, setSummary] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        const gameData = {
            title,
            category,
            maxLevel,
            imageUrl,
            summary,
        };
        gameService.create(gameData).then((result) => {
            gameAdd(result);
            navigate("/catalog");
        });
    };

    const changeTitleHandler = (e) => {
        setTitle(e.target.value);
    };

    const changeCategoryHandler = (e) => {
        setCategory(e.target.value);
    };

    const changeMaxLevelHandler = (e) => {
        setMaxLevel(e.target.value);
    };

    const changeImageUrlHandler = (e) => {
        setImageUrl(e.target.value);
    };
    const changeSummaryHandler = (e) => {
        setSummary(e.target.value);
    };

    return (
        <section id="create-page" className="auth">
            <form id="create" onSubmit={onSubmit}>
                <div className="container">
                    <h1>Create Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter game title..."
                        value={title}
                        onChange={changeTitleHandler}
                    />
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        placeholder="Enter game category..."
                        value={category}
                        onChange={changeCategoryHandler}
                    />
                    <label htmlFor="levels">MaxLevel:</label>
                    <input
                        type="number"
                        id="maxLevel"
                        name="maxLevel"
                        min={1}
                        placeholder={1}
                        value={maxLevel}
                        onChange={changeMaxLevelHandler}
                    />
                    <label htmlFor="game-img">Image:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        placeholder="Upload a photo..."
                        value={imageUrl}
                        onChange={changeImageUrlHandler}
                    />
                    <label htmlFor="summary">Summary:</label>
                    <textarea
                        name="summary"
                        id="summary"
                        value={summary}
                        onChange={changeSummaryHandler}
                    />
                    <input
                        className="btn submit"
                        type="submit"
                        value="Create Game"
                    />
                </div>
            </form>
        </section>
    );
};

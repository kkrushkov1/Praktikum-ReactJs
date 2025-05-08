import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import * as gameService from "../../services/gameService";
import { GameContext } from "../../contexts/GameContext";

export const EditGame = () => {
    const { gameEdit } = useContext(GameContext);
    const { gameId } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [maxLevel, setMaxLevel] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [summary, setSummary] = useState("");

    useEffect(() => {
        gameService.getById(gameId).then((gameData) => {
            setTitle(gameData.title);
            setCategory(gameData.category);
            setMaxLevel(gameData.maxLevel);
            setImageUrl(gameData.imageUrl);
            setSummary(gameData.summary);
        });
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        const gameData = {
            title,
            category,
            maxLevel,
            imageUrl,
            summary,
        };

        gameService.edit(gameId, gameData).then((result) => {
            gameEdit(gameId, result);
            navigate(`/catalog/${gameId}`);
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
        <section id="edit-page" className="auth">
            <form id="edit" onSubmit={onSubmit}>
                <div className="container">
                    <h1>Edit Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={changeTitleHandler}
                    />
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={category}
                        onChange={changeCategoryHandler}
                    />
                    <label htmlFor="levels">MaxLevel:</label>
                    <input
                        type="number"
                        id="maxLevel"
                        name="maxLevel"
                        min={1}
                        value={maxLevel}
                        onChange={changeMaxLevelHandler}
                    />
                    <label htmlFor="game-img">Image:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
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
                        value="Edit Game"
                    />
                </div>
            </form>
        </section>
    );
};

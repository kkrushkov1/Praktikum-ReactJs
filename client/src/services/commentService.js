import * as request from "./requester";

const baseUrl = "http://localhost:3000/comments";

export const getAll = () => request.get(baseUrl);

export const getByGameId = (gameId) =>
    request.get(`${baseUrl}/?gameId=${gameId}`);

export const createComment = (gameData) => request.post(baseUrl, gameData);

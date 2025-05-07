import * as request from "./requester";

const baseUrl = "http://localhost:3000/games";

export const getAll = () => request.get(baseUrl);

export const getById = (id) => request.get(`${baseUrl}/${id}`);

export const create = (gameData) => request.post(baseUrl, gameData);

export const edit = (gameId, gameData) =>
    request.put(`${baseUrl}/${gameId}`, gameData);

export const deleteById = (id) => request.del(`${baseUrl}/${id}`);

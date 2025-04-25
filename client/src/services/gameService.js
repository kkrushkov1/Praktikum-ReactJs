import * as request from "./requester";

const baseUrl = "http://localhost:3000/games";

export const getAll = () => request.get(baseUrl);

export const getById = (id) => request.get(`${baseUrl}/${id}`);

export const create = (gameData) => request.post(baseUrl, gameData);

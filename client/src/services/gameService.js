import * as request from "./requester";

const baseUrl = "http://localhost:3000";

export const getAll = () => request.get(`${baseUrl}/games`);

export const getById = (id) => request.get(`${baseUrl}/games/${id}`);

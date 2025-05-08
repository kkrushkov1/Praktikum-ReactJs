import * as request from "./requester";

const baseUrl = "http://localhost:3000";

export const login = (email, password) =>
    request.post(`${baseUrl}/login`, { email, password });

export const register = (registerInfo) =>
    request.post(`${baseUrl}/register`, registerInfo);

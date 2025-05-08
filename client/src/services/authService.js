import * as request from "./requester";

const baseUrl = "http://localhost:3000";

export const login = (loginInfo) => request.post(`${baseUrl}/login`, loginInfo);

export const register = (registerInfo) =>
    request.post(`${baseUrl}/register`, registerInfo);

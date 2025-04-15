const baseUrl = "http://localhost:3000";

export const getAll = () => {
    return fetch(`${baseUrl}/games`).then((res) => res.json());
};

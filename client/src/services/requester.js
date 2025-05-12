const request = async (method, url, data) => {
    try {
        const authString = localStorage.getItem("auth");
        const auth = JSON.parse(authString || "{}");
        let userId;
        let headers = {};

        if (auth.accessToken) {
            headers["Authorization"] = `Bearer ${auth.accessToken}`;
            userId = auth.user.id;
        }

        const body = { ...data, userId };
        let buildRequest;

        if (method === "GET") {
            buildRequest = fetch(url);
        } else {
            buildRequest = fetch(url, {
                method,
                headers: {
                    "content-type": "application/json",
                    ...headers,
                },
                body: JSON.stringify(body),
            });
        }
        const response = await buildRequest;

        const result = await response.json();

        return result;
    } catch (error) {
        console.log(error);
        throw new Error(error.message || "Request failed");
    }
};

export const get = request.bind({}, "GET");
export const post = request.bind({}, "POST");
export const put = request.bind({}, "PUT");
export const patch = request.bind({}, "PATCH");
export const del = request.bind({}, "DELETE");

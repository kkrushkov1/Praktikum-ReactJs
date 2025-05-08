const jsonServer = require("json-server");
const auth = require("json-server-auth");

const app = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const rules = auth.rewriter({
    games: 644, // User must own the resource to write the resource. Everyone can read the resource.
    comments: 664, // User must be logged to write the resource. Everyone can read the resource.
});

app.db = router.db;
app.use(middlewares);
app.use(rules);
app.use(auth);
app.use(router);

app.listen(3000, () => {
    console.log("🚀 JSON Server with Auth is running on http://localhost:3000");
});

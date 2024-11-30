const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json"); // Path to your mock db.json file
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);


// Custom POST route for login
server.post("/api/login", (req, res) => {
    console.log(req.body,'xyxyxy');
  const { email, password } = req.body;

  // Validate the credentials
  const users = router.db.get("users").value();
  console.log(users);
  const user = users.find((u) => u.email == email && u.password == password);
console.log(user);
  if (user) {
    // Return success and access/refresh tokens if valid
    return res.json({
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
      message: "Login successful",
    });
  } else {
    // Return error if credentials are invalid
    return res.status(401).json({ message: "Invalid email or password" });
  }
});

// Custom route for token refresh
server.post("/auth/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;

  // Validate the refresh token
  const users = router.db.get("users").value();
  const user = users.find((u) => u.refreshToken === refreshToken);

  if (user) {
    return res.json({ accessToken: user.accessToken });
  } else {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
});

// Mount the default JSON Server router
server.use(router);

// Start the server
server.listen(4000, () => {
  console.log("JSON Server is running on http://localhost:4000");
});

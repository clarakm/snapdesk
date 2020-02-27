const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

// server port
const PORT = 3000;

//socket stuff
const http = require("http");
const socketIO = require("socket.io");

const server = http.createServer(app);
const io = socketIO(server);

/**
 * REQUIRE IN ROUTERS HERE
 */
const apiRouter = require("./routes/api");
const loginRouter = require("./routes/login");

/**
 * REQUIRE IN MIDDLEWARE HERE
 */

/**
 * Handle parsing of the body and cookies
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 *  Route handlers
 */
app.use("/api", apiRouter);
app.use("/login", loginRouter);

// handle static files
app.use("/build", express.static(path.join(__dirname, "../build")));
app.use(express.static(path.join(__dirname, "../img")));

// response with main app
if (process.env.NODE_ENV === "production") {
  app.get("/", (req, res) =>
    res.status(200).sendFile(path.resolve(__dirname, "../index.html"))
  );
}

// SOCKET
io.on("connection", socket => {
  console.log("New User Connected!!");

  socket.on("chat", message => {
    console.log("message: ", message);

    io.emit("chat", message);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    // socket.removeAllListeners;
  });
});

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.sendStatus(404));

/**
 * express error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred. Check server logs for detials." }
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * Start server
 */
// app.listen(PORT, () => {
//   console.log(`Server is listening on port: ${PORT}`);
// });
server.listen(3000);

const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const dbConnect = require("./db/dbConnect");
const UserRouter = require("./routes/UserRouter");
const PhotoRouter = require("./routes/PhotoRouter");
const CommentRouter = require("./routes/CommentRouter.js");
const AuthRouter = require("./routes/AuthRouter.js");
const AdminRouter = require("./routes/AdminRouter.js");

dbConnect();

app.use(cookieParser());
app.use(cors({
  // origin: "http://localhost:3000",
  origin:"https://sck5zr-3000.csb.app",
  credentials: true,
}));
app.use(express.json());
app.use("/api/user", UserRouter);
app.use("/api/photo", PhotoRouter);
app.use("/api/comment", CommentRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/admin", AdminRouter);

app.get("/", (request, response) => {
  response.send({ message: "Hello from photo-sharing app API!" });
});

app.listen(8081, () => {
  console.log("server listening on port 8081");
});

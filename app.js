// app.js

import express from "express"; //express 많은 걸 도와주는 놈, 내장 <<<
import cookieParser from "cookie-parser";
import UsersRouter from "./routers/users.router.js";
import ErrorHandlingMiddleware from "./middlewares/error-handling.middleware.js";
import LogMiddleware from "./middlewares/log.middleware.js";
import documentsRouter from "./routers/documents.router.js";

const app = express();
const PORT = 3018;

app.use(express.json());
app.use(cookieParser());
app.use("/api", [UsersRouter, documentsRouter]);
app.use(ErrorHandlingMiddleware);
app.use(LogMiddleware);

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸어요!");
});

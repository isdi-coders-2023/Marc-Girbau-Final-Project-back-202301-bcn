import "../loadEnvironment.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { generalError, notFoundError } from "./middlewares/errors/errors.js";
import usersRouter from "./routers/usersRouters/usersRouters.js";
import gamesRouter from "./routers/gamesRouters/gamesRouters.js";

const routes = { users: "/users", games: "/games" };

export const app = express();

app.disable("x-powered-by");

const corsOptions = {
  origin: [
    "http://localhost:4000",
    "http://localhost:4001",
    "http://localhost:3001",
    "http://localhost:19006",
  ],
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

app.use(routes.users, usersRouter);
app.use(routes.games, gamesRouter);

app.use(notFoundError);
app.use(generalError);

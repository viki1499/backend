import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import userRoutes from "./routes/user";
import notesRoutes from "./routes/notes";
import bodyParser from "body-parser";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";

const app = express();
const cors = require("cors");

app.use(morgan("dev"));

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 100,
    },
    rolling:true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_DB_CONNECTION
    })
  })
);

app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000", // allow requests from only this origin
  })
);

app.use(bodyParser.json());
app.use("/api/notes", notesRoutes);
app.use("/api/users", userRoutes);
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);

  let errorMessage = "An Unknown error occurred";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.statusCode;
    errorMessage = error.message;
  }
  // if (error instanceof Error) errorMessage = error.message;
  res.status(500).json({ error: errorMessage });
});

export default app;

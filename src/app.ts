import express, { json } from "express";
import cors from "cors";

import main from "./routers/index.js";
import { errorHandler } from "./middlewares/errorHandlerMiddleware.js";

const app = express();
app.use(cors());
app.use(json());
app.use(main);
app.use(errorHandler)

export default app;
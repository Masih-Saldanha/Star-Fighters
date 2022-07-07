import express, { json } from "express";
import cors from "cors";

import main from "./routers/index.js";

const app = express();
app.use(cors());
app.use(json());
app.use(main);

export default app;
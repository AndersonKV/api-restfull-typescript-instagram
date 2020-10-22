import express from "express";
import cors from "cors";
import path from "path";

const app = express();

import routes from "./routes";
//conecta ao banco de dados
import "./connection";

app.use(cors());
app.use(express.json());
app.use(routes);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.listen(3333);

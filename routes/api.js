import express from "express";
import * as movieController from "../controllers/movieController.js";

const api = express.Router();

api.get("/movie", movieController.listMovie);
api.post("/movie", movieController.addListMovie);
api.put("/movie/:id", movieController.updateDataMovie);
api.delete("/movie/:id", movieController.deleteMovie);

export default api;

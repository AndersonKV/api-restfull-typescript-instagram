import { Router } from "express";
import multer from "multer";

import UserController from "./controllers/UserController";
import PostController from "./controllers/PostController";

import uploadConfig from "./config/upload";

const upload = multer(uploadConfig);

const routes = Router();

//UserController
routes.post("/user", UserController.store);
routes.get("/user/:_id", UserController.index);
routes.get("/users", UserController.show);
routes.delete("/user/:_id", UserController.delete);
routes.delete("/users", UserController.destroyer);

//PostController
routes.post("/post", upload.array("post_image"), PostController.store);
routes.get("/post/:_id", PostController.index);
routes.get("/posts", PostController.show);
routes.delete("/delete/:_id", PostController.delete);
routes.delete(
  "/destroyer",
  upload.array("post_image"),
  PostController.destroyer
);

export default routes;

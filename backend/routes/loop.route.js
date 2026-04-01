import express from "express";
import { isAuth } from '../middlewares/isAuth.js';
import { upload } from '../middlewares/multer.js';
import { getAllLoops, LoopComment, LoopLike, uploadLoop } from "../controllers/loop.controller.js";

const loopRouter = express.Router();

loopRouter.post("/upload",isAuth,upload.single("media"), uploadLoop);
loopRouter.post("/like/:loopId",isAuth, LoopLike);
loopRouter.post("/comment/:loopId",isAuth, LoopComment);
loopRouter.get("/getAll",isAuth, getAllLoops);

export default loopRouter;
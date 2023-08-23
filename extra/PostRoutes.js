import express from "express";
import {
  CreatePost,
  DeletePost,
  GetAllPost,
  GetSinglePost,
  GetUserposts,
  SearchPost,
  UpdatePost,
} from "../controller/postController.js";
import { VeriftTokenAndUser } from "../utils/Verify.js";
import { PostValidation } from "../utils/Validation.js";

const router = express.Router();

router.post("/createpost/:id", PostValidation, VeriftTokenAndUser, CreatePost);

router.get("/getallpost", GetAllPost);

router.get("/getsinglepost/:id/:postId", GetSinglePost);

router.get("/getuserpost/:id", VeriftTokenAndUser, GetUserposts);

router.get("/searchpost/:id", VeriftTokenAndUser, SearchPost);

router.put(
  "/updatepost/:id/:postId",
  PostValidation,
  VeriftTokenAndUser,
  UpdatePost
);

router.delete("/deletepost/:id/:postId", VeriftTokenAndUser, DeletePost);

export default router;

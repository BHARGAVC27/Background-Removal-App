import express from "express";
import { clerkWebhooks, getUserCredits } from "../controllers/userController.js";
import authUser from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/webhooks", clerkWebhooks);
userRouter.get("/credits", authUser, getUserCredits);
export default userRouter;

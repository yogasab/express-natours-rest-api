const express = require("express");
const {
	signUp,
	signIn,
	forgotPassword,
	resetPassword,
	updatePassword,
} = require("../controllers/AuthController");
const ProtectRoute = require("../middlewares/ProtectRoute");
const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);

authRouter.post("/forgot-password", forgotPassword);
authRouter.patch("/update-password", ProtectRoute, updatePassword);
authRouter.patch("/reset-password/:token", resetPassword);

module.exports = authRouter;

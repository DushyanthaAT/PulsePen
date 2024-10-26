import exprerss from "express";
import { signup } from "../controllers/auth.controller.js";

const router = exprerss.Router();

router.post("/signup", signup);

export default router;
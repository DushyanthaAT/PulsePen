import exprerss from "express";
import { signin, signup } from "../controllers/auth.controller.js";

const router = exprerss.Router();

router.post("/signup", signup);
router.post("/signin", signin);


export default router;

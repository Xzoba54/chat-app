import { Router } from "express";
const router: Router = Router();

import * as Controller from "../controllers/auth.controller";

router.post("/create-user", Controller.createUser);
router.post("/check-user", Controller.checkUser);

export { router as AuthRouter };

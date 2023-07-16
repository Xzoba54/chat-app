import { Router } from "express";
import * as Controller from "../controllers/user.controller";

const router: Router = Router();

router.get("/:id", Controller.getUserById);
router.get("/", Controller.getAllUsers);

export { router as UserRouter };

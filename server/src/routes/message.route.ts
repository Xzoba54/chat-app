import { Router } from "express";
import * as Controller from "../controllers/message.controller";
const router: Router = Router();

router.post("/create", Controller.createMessage);
router.get("/:fromId/:toId", Controller.getMessages);

export { router as MessageRouter };

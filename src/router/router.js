import { Router } from "express";
import { getAllBugReports, saveBugReport } from "../controllers/controller.js";

const router = Router();
router.get("/", getAllBugReports);
router.post("/", saveBugReport);
export default router;

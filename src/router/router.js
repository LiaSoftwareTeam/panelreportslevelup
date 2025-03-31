import { Router } from "express";
import {
  createUser,
  getAllBugReports,
  getUser,
  loginUser,
  saveBugReport,
} from "../controllers/controller.js";

const router = Router();

// Rutas para los reportes de bugs
router.get("/", getAllBugReports);
router.post("/", saveBugReport);

// Rutas para la creación de usuarios y login
router.post("/users/login", loginUser); // Iniciar sesión

export default router;


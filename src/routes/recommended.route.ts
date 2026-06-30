import { Router } from "express";
import { recommendedMovies } from "../controllers/recommended.controller.js";

const router = Router();


router.post("/", recommendedMovies);

export default router;


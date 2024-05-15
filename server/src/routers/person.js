import { Router } from "express";
import userControllers from "../controllers/person-controllers.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const router = new Router();

router.post('/registration', userControllers.registration);
router.post('/login', userControllers.login);

router.get('/logout', userControllers.logout);
router.get('/refresh', userControllers.refresh);
router.get('/persons',authMiddleware, userControllers.getAllPersons);

export default router;
import { Router } from "express";
import personRouter from './person.js';

const router = Router();

router.use('/person', personRouter);

export default router;
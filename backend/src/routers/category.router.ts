import { Router } from "express";
import asyncHandler from 'express-async-handler';
import { CategoryModel } from "../models/category.model";

const router = Router();

router.get('/', asyncHandler(
    async (req, res) => {
        const categories = await CategoryModel.find();
        if (categories) {
            res.send(categories);
        } else res.status(500);
    }
));

export default router;
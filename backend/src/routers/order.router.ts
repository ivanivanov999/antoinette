import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { HTTP_BAD_REQUEST, HTTP_NOT_FOUND } from '../constants/http_status';
import authMid from '../middlewares/auth.mid';
import { OrderModel } from '../models/order.model';

const router = Router();
router.use(authMid);

router.post('/create', asyncHandler(
    async (req: any, res: any) => {
        const requestOrder = req.body;

        if (requestOrder.items.length <= 0) {
            res.status(HTTP_BAD_REQUEST).send('Количката е празна!');
            return;
        }

        const newOrder = new OrderModel({...requestOrder, user: req.user.id});
        await newOrder.save();
        res.send(newOrder);

    }
));

router.get('/myorders', asyncHandler(
    async (req: any, res: any) => {
        const orders = await OrderModel.find({user: req.user.id}).sort({ createdAt: 'desc' });
        if (orders) {
            res.send(orders);
        } else res.status(HTTP_NOT_FOUND).send(`Няма намерени поръчки на потребител с имейл ${req.user.email}`);
    }
));

export default router;
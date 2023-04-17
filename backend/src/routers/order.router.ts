import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { HTTP_BAD_REQUEST, HTTP_UNAUTHORIZED } from '../constants/http_status';
import authMid from '../middlewares/auth.mid';
import { OrderModel } from '../models/order.model';
import { OrderStatus } from '../constants/order_status';

const router = Router();
router.use(authMid);

router.get('/', asyncHandler(
    async (req: any, res: any) => {
        if (!req.user.isAdmin) {
            res.status(HTTP_UNAUTHORIZED).send();
        } else {
            const orders = await OrderModel.find().or([
                {status: OrderStatus.WAITING},
                {status: OrderStatus.CONFIRMED},
                {status: OrderStatus.SHIPPED}
            ]).sort({createdAt: 'desc'});
            res.send(orders);
        }
    }
));

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

export default router;
import { Router } from "express";
import asyncHandler from 'express-async-handler';
import { ItemAndSimilar, ItemModel } from "../models/item.model";
import { DeliveryModel } from "../models/delivery.model";
import { HTTP_NOT_FOUND } from "../constants/http_status";

const router = Router();

router.get('/', asyncHandler(
    async (req, res) => {
        const items = await ItemModel.find();
        res.send(items);
    }
))

router.get('/deliveries', asyncHandler(
    async (req, res) => {
        const deliveries = await DeliveryModel.find().sort({ name: 'asc' });
        res.send(deliveries);
    }
))

router.get('/search/:searchTerm', asyncHandler(
    async (req, res) => {
        const searchRegex = new RegExp(req.params.searchTerm, 'i');
        const items = await ItemModel.find({ name: { $regex: searchRegex } });
        res.send(items);
    }
))

router.get('/category/:category', asyncHandler(
    async (req, res) => {
        const items = await ItemModel.find({ category: req.params.category });
        res.send(items);
    }
))

router.get('/tags', asyncHandler(
    async (req, res) => {
        const tags = await ItemModel.aggregate([
            {
                $unwind: '$tags'
            },
            {
                $group: {
                    _id: '$tags',
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    name: '$_id',
                    count: '$count'
                }
            }
        ]).sort({ count: -1 });

        const all = {
            name: 'All',
            const: await ItemModel.countDocuments()
        }

        tags.unshift(all);
        res.send(tags);
    }
))

router.get('/tag/:tagName', asyncHandler(
    async (req, res) => {
        const items = await ItemModel.find({ tags: req.params.tagName });
        res.send(items);
    }
))

router.get('/:itemId', asyncHandler(
    async (req, res) => {
        if (req.params.itemId.length) {
            const item = await ItemModel.findById(req.params.itemId);
            if (item) {
                const category = item.category;
                const tags = item.tags;
                const getItemsByTag = function () {
                    if (tags.length) {
                        return ItemModel.find({ $and: [{ tags: { $in: tags } }, { _id: { $ne: item.id } }] }).limit(4).sort({ createdAt: 'desc' })
                    } else return []
                }
                let [itemsByCategory, itemsByTags] = await Promise.all([
                    ItemModel.find({ $and: [{ category: category }, { _id: { $ne: item.id } }] }).limit(4).sort({ createdAt: 'desc' }),
                    getItemsByTag()
                ]);
                const similarItems = Array.from(new Map([...itemsByTags, ...itemsByCategory].map((m) => [m.id, m])).values());
                const response: ItemAndSimilar = {
                    item: item,
                    similarItems: similarItems
                };
                res.send(response);
            } else {
                res.status(HTTP_NOT_FOUND).send('Не е намерен артикул');
            }
        } else {
            res.status(HTTP_NOT_FOUND).send('Липсва номер на артикул');
        }
    }
))

export default router;
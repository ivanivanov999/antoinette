import { Router } from "express";
import { sample_items } from "../data";
import asyncHandler from 'express-async-handler';
import { ItemModel } from "../models/item.model";
import { DeliveryModel } from "../models/delivery.model";

const router = Router();

router.get('/', asyncHandler(
    async (req, res) => {
        const items = await ItemModel.find();
        res.send(items);
    }
))

router.get('/deliveries', asyncHandler(
    async (req, res) => {
        const deliveries = await DeliveryModel.find().sort({name: 'asc'});
        res.send(deliveries);
    }
))

router.get('/search/:searchTerm', asyncHandler(
    async (req, res) => {
        const searchRegex = new RegExp(req.params.searchTerm, 'i');
        const items = await ItemModel.find({name: {$regex: searchRegex}});
        res.send(items);
    }
))

router.get('/category/:category', asyncHandler(
    async (req, res) => {
        const items = await ItemModel.find({category: req.params.category});
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
                    count: {$sum: 1}
                }
            },
            {
                $project: {
                    _id: 0,
                    name: '$_id',
                    count: '$count'
                }
            }
        ]).sort({count: -1});

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
        const items = await ItemModel.find({tags: req.params.tagName});
        res.send(items);
    }
))

router.get('/:itemId', asyncHandler(
    async (req, res) => {
        const item = await ItemModel.findById(req.params.itemId);
        res.send(item);
    }
))

export default router;
import { Router } from "express";
import asyncHandler from "express-async-handler";
import admin from "firebase-admin";
import { getStorage } from 'firebase-admin/storage'
import multer from 'multer';
import fs from 'fs';
import { promisify } from 'util';
import { ItemModel } from "../models/item.model";
import sharp from 'sharp';
import { OrderModel } from "../models/order.model";
import { OrderStatus } from "../constants/order_status";
import adminMid from "../middlewares/admin.mid";
import { Category, CategoryModel } from "../models/category.model";

/*
//Cloudinary
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
*/

const unlink = promisify(fs.unlink);
var path = require('path');

// Firebase
var serviceAccount = require("../antoinette-home-decor-firebase-adminsdk-vrgly-774d031ccd.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'antoinette-home-decor.appspot.com'
});
const bucket = getStorage().bucket();

// Multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + Date.now() + path.extname(file.originalname))
  }
});
const upload = multer({ storage: storage });

// Define router and middleware
const router = Router();
router.use(adminMid);

router.get('/orders', asyncHandler(
  async (req: any, res: any) => {
    const orders = await OrderModel.find().or([
      { status: OrderStatus.WAITING },
      { status: OrderStatus.CONFIRMED },
      { status: OrderStatus.SHIPPED }
    ]).sort({ updatedAt: 'asc' });
    res.send(orders);
  }
));

router.get('/orders/status/:status', asyncHandler(
  async (req: any, res: any) => {
    const status = req.params.status;
    const orders = await OrderModel.find({ status: status }).sort({ updatedAt: 'asc' });
    res.send(orders);
  }
));

router.put('/updateorder/:orderId', asyncHandler(
  async (req: any, res: any) => {
    const newStatus: string = req.body.status;
    const orderId: string = req.params.orderId;
    OrderModel.findByIdAndUpdate(orderId, { status: newStatus }).then(data => {
      if (!data) {
        res.status(404).send(`Не е намерена поръчка номер ${orderId}`);
      } else res.send({ message: "Статусът е актуализиран успешно" });
    }).catch(err => {
      res.status(500).send({
        message: `Проблем с актуализирането на поръчка номер ${orderId}`
      })
    })
  }
))


router.post('/newitem', upload.array('images'), asyncHandler(
  async (req: any, res: any) => {
    const requestItem = req.body;
    let images: string[] = [];
    let thumbnail: string = '';

    for (let index = 0; index < req.files.length; index++) {
      if (index == 0) {
        await sharp(req.files[0].path).resize(350, 350).webp().toFile(`./outputs/${req.files[0].filename}-thumbnail.webp`);
        await bucket.upload(`./outputs/${req.files[0].filename}-thumbnail.webp`);
        unlink(`./outputs/${req.files[0].filename}-thumbnail.webp`);
        await bucket.file(`${req.files[0].filename}-thumbnail.webp`).getSignedUrl({
          action: 'read',
          expires: '03-09-2491'
        }).then(async (signedUrls) => {
          thumbnail = signedUrls[0];
        });
      }
      await sharp(req.files[index].path).resize(800, 800, { fit: 'inside' }).webp().toFile(`./outputs/${req.files[index].filename}.webp`);
      unlink(req.files[index].path);
      await bucket.upload(`./outputs/${req.files[index].filename}.webp`);
      unlink(`./outputs/${req.files[index].filename}.webp`);
      await bucket.file(`${req.files[index].filename}.webp`).getSignedUrl({
        action: 'read',
        expires: '03-09-2491'
      }).then(async (signedUrls) => {
        images.push(signedUrls[0]);
      });

      //Delete image from uploads

      //If all images are uploaded, give urls to MongoDB
      if (index === req.files.length - 1) {
        const newItem = new ItemModel({ ...requestItem, imageUrl: images, thumbnail: thumbnail });
        await newItem.save();
        res.send(newItem);
      }
    }

    /*
    await bucket.upload(req.file.path);
    bucket.file(req.file.filename).getSignedUrl({
      action: 'read',
      expires: '03-09-2491'
    }).then(async (signedUrls) => {
      const newItem = new ItemModel({...requestItem, imageUrl: [signedUrls[0]]});
      await newItem.save();
      await unlinkAsync(req.file.path);
    })
    */

    /*
    await cloudinary.uploader.upload(req.files[0].path, { transformation: { quality: "auto", fetch_format: "webp", height: 400, width: 400, crop: "fill" } })
      .then((data: any) => {
        thumbnail = data.secure_url;
      });
    for (let index = 0; index < req.files.length; index++) {
      await cloudinary.uploader.upload(req.files[index].path, { transformation: { quality: "auto", fetch_format: "webp", height: 800, width: 800, crop: "limit" } })
        .then(async (data: any) => {
          images.push(data.secure_url);
          unlink(req.files[index].path);
          if (index === req.files.length - 1) {
            const newItem = new ItemModel({ ...requestItem, imageUrl: images, thumbnail: thumbnail });
            await newItem.save();
          }
        }).catch((err: Error) => {
          console.log('Проблем със сървъра');
        });
    }
    */
  }
));

router.post('/newcategory', upload.single('image'), asyncHandler(
  async (req: any, res: any) => {
    const requestCategory = req.body;
    let image: string = '';
    await sharp(req.file.path).resize(200, 200).webp().toFile(`./outputs/${req.file.filename}-category.webp`);
    unlink(req.file.path);
    await bucket.upload(`./outputs/${req.file.filename}-category.webp`);
    unlink(`./outputs/${req.file.filename}-category.webp`);
    await bucket.file(`${req.file.filename}-category.webp`).getSignedUrl({
      action: 'read',
      expires: '03-09-2491'
    }).then(async (signedUrls) => {
      image = signedUrls[0];
      const newItem = new CategoryModel({ imageUrl: image, name: requestCategory.name, rank: requestCategory.rank ? requestCategory.rank : 1 });
      await newItem.save();
      res.send(newItem);
    });
  }
));

export default router;
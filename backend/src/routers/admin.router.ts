import { Router } from "express";
import asyncHandler from "express-async-handler";
// Import the functions you need from the SDKs you need
import admin from "firebase-admin";
import { getStorage } from 'firebase-admin/storage'
import multer from 'multer';
import fs from 'fs';
import { promisify } from 'util';
import { ItemModel } from "../models/item.model";

const cloudinary = require('cloudinary').v2;

// Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const unlinkAsync = promisify(fs.unlink)
var path = require('path');

/*
var serviceAccount = require("../antoinette-home-decor-firebase-adminsdk-vrgly-774d031ccd.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'antoinette-home-decor.appspot.com'
});
const bucket = getStorage().bucket();
*/

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + Date.now() + path.extname(file.originalname))
  }
});
const upload = multer({ storage: storage });

const router = Router();


router.post('/newitem', upload.single('images'), asyncHandler(
  async (req: any, res: any) => {
    const requestItem = req.body;
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
    const onUpload = cloudinary.uploader.upload(req.file.path, { transformation: {quality: "auto", fetch_format: "auto"}});
    onUpload.then(async (data: any) => {
      const newItem = new ItemModel({ ...requestItem, imageUrl: [data.secure_url] });
      await newItem.save();
      await unlinkAsync(req.file.path);
    }).catch((err: Error) => {
      console.log(err);
    });
  }
));

export default router;
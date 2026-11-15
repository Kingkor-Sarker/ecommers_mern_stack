// require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();

const serverport = process.env.server_port || 3001

const mongodbURL = process.env.MONGODB_ATLAS_URL || "mongodb://localhost:27017/ecommersMernDB"

const defaultImagePath = process.env.DEFAULT_USER_IMAGE_PATH || "public/images/users/default.png"

export {serverport, mongodbURL, defaultImagePath};
// const app = require('./app.js');
import { connectDB } from "../config/db.js";
import app from "./app.js";
import {serverport} from "./secret.js"


app.listen(serverport, async() => {
    console.log(`Server is running on http://localhost:${serverport}`);
    await connectDB();
});
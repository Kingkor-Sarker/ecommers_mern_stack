import {User} from "../models/userModel.js"
import {data} from "../data.js"
const seedUser = async (req, res, next) =>{
    try{
        //deleting all existing user
        await User.deleteMany({});
        //inseting dummy data
        const users = await User.insertMany(data.users)
        //succesfull responce
        return res.status(201).json(users)
    }catch(error){
        next(error)
    }
}

export {seedUser};
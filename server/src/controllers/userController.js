import createError from "http-errors";
import { User } from "../models/userModel.js";


const getUsers = async (req, res, next) =>{
    try{
        const search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 2;

        const searchRegExp = new RegExp(`.*${search}.*`, "i");

        const filter = {
            isAdmin : {$ne: true}, //not showing addmin to the another user
            $or: [
                {name: {$regex: searchRegExp}}, // for filturing by  name
                {email: {$regex: searchRegExp}}, // for filtering by email
                {phone: {$regex: searchRegExp}}, // for filtering by phojne number
            ]
        }
        const options = {password: 0}; //for not showing password to the admin

        //page limit 5 user
        const users = await User.find(filter, options)
        .limit(limit)
        .skip((page-1)* limit);

        const count = await User.find(filter).countDocuments();

        if(!users) throw createError(404, "user not found");
        res.status(200).send({
            message: "User found",
            users,
            pagination: {
                totalPages: Math.ceil(count/limit),
                currentPage: page,
                previousPage: page - 1 > 0 ? page - 1: null,
                nextPage: page + 1 <= Math.ceil(count/limit) ? page+1 : null,
            }
        })
    }catch(error){
        next(createError(500,error))
    }
}

export default getUsers
//what is the role of this auth middleware ?
//It will verify whether user is present or not

import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";


export const verifyJWT = asyncHandler(async (req,res,next) => { //whenever dealing with middleware , if you will next either to move to next middleare once this middleware execution is done or move response
    try {
        //sometime user send token in header as well name as "Authorization" (Bearer token) as we need token so we removed "Bearer ""
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        //console.log("tokennnnn: ", token)
        if(!token) {
            throw new ApiError(401, "Unauthorized request")
        }    
    
        //verify() takes 2 argument , token to be deocde & signature to verify whether this token can be decoded for sign provided
        const decodeToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
        //console.log("token: ", decodeToken)
        
        //while generating the access token (check user model line 74) we have _id as one of the data
        //which means decodeToken should contain _id
        const user = await User.findById(decodeToken?._id).select("-password -refreshToken")
    
        if(!user) {
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user // as discuss many times middleware high level purpose is to add more fields to request object , now  user object will be added to req object which can be used in logout functionality
        next()
    } catch (error) {
        throw new ApiError(401, "Invalid Access Token")
    }
})
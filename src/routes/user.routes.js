import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([ //this is the middleware to receives images from user before calling registerUser()
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
    );

//middleware high level purpose is to add more fields to request object 
//upload is multer middleware which will upload the files coming from user to public/temp folder before sending the request to registerUser() and provides access of files to request object by adding field files in the request object(check user controller)
export default router;
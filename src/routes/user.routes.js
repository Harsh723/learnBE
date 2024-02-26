import { Router } from "express";
import { changeCurrentPassword, 
        getCurrentUser, 
        getUserChannelProfile, 
        getWatchHistory, 
        loginUser, 
        logoutUser, 
        refreshAccessToken, 
        registerUser, 
        updateAccountDetails, 
        updateUserAvatar 
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

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
//generally we use middleware during routes

router.route("/login").post(loginUser);

//secured routes(means user should be logged in)
//how to use custom middleware
//just pass as aargument to any http method
//now you understand the purpose o next() , so once verifyJWT work is done then next will move the control to logoutUser
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails) // patch ?
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)
router.route("/channel/:username").get(verifyJWT, getUserChannelProfile)
router.route("/history").get(verifyJWT, getWatchHistory)

export default router;
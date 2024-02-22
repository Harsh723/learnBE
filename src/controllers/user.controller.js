import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

//we are passing callback fn to async handler
const registerUser = asyncHandler( async (req,res) => {
   //get user details from FE
   //validation - not empty
   //check if user already exist : username , password
   //check for images, check for avatar(it is required field)
   //upload them to cloudinary, avatar
   //create user object beacuse mongo is a nosql db which takes object- create in db
   //remove password and refresh toekn field from response
   //check for user creation in db
   // if user created in db then return response

   const { fullname, email, username, password } = req.body;

   console.log("email is:", email);

    //validation check -- field should not be empty

    //begginer level code is to check each field is not empty with separate if else condition

    //advance level code file is not empty
    if(
        [fullname,email,username,password].some(field => field?.trim() === "") //if eny feild is empty , it will return true
    ) {
        throw new ApiError(400, "All fields are required")
    }

    //we can add multiple validation as well , for example - email format, fullname should have only alphabets etc..

    //to check user already exits or not
    const existedUser = User.findOne({ //with User which can connect directly to db , we can check if username or email already exist in db
        $or: [{ username } , { email }] //to check multiple feilds in mongodb we can use this syntax $or
    })

    if(existedUser) {
        throw new ApiError(409, "User with email or username already exists") //check status 409 meaning
    }

    console.log('pathhhh', req.files);
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }

    //step - upload images to cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    //check one more whether avatar got uploaded to cloudinary beofre storing to db as it is a required feild
    if(!avatar){
        throw new ApiError(400, "Avatar file is required")
    }

    //store data to db
    //through this User we are talking to mongodb
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "", //as this field is not mandatory (we are not checking above unlike avatar whether coverImage got uploaded i.e if url is there then store empty string )
        email,
        password,
        username: username.toLowerCase(),
    })

    //to test whether got created in db or not
    //findById() provided by mongodb search user by id
    //Whenever we add new entriy in mongodb then it creates _id feild automatically in db
    //findById will return all the data of user but we dont need password or refreshtoken
    //to remove those field from response of db mongodb provides a select() which takes string arugument where you have to which fields are not required.
    //select syntax is wierd but it is how it is
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while regestring the user");
    }

    //return the response to client

    return res.status(201).json(
        new ApiResponse(200, createdUser, "user registered successfully")
    )
})

export { registerUser };
import { asyncHandler } from '../utils/asyncHandler.js';

//we are passing callback fn to async handler
const registerUser = asyncHandler( async (req,res) => {
    res.status(200).json({
        message: "ok"
    })
})

export { registerUser };
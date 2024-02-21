import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: CLOUDINARY_API_SECRET 
});


const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null;

        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type : auto //we are saying cloudinary to check itself which type of file is being uploaded
        })
        
        //file has been uploaded successfully
        console.log("file is uploaded on cloudinary", response.url);

        return response; //returning entire response to FE and let them decide which property is required for them

    } catch(error) {
        fs.unlink(localFilePath); // remove the locally saved temporary file as the  upload operation to cloudinary got failed
        return null;
    }
}

//localFilePath ? 
//So the concept is instead of uploading the file directly to cloudinary , will fisrt store the file locally.
//locally will store with help of multer and then will take the localfilePath to store to cloudinary.
//It is the industry standary approach to first upload in local space and the from there upload to cloudinary.
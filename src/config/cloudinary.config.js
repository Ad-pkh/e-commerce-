// Require the cloudinary library
require("dotenv").config()
const cloudinary = require('cloudinary').v2;


// Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
  
});

// Log the configuration
//console.log(cloudinary.config());

/////////////////////////
// Uploads an image file
/////////////////////////
const uploadImage = async (imagePath) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: true,
      overwrite: false,
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);
      //console.log(result);

       // Extract public_id and url from the result
       const { public_id, url } = result;
    
    // Return an object with both values
     return { public_id, url };

    } catch (exception) {
      console.log('error while uploading in clouud ',exception);
      throw(exception);
    }
};

const deleteImage=async(public_id)=>{
  try {
    const result=await cloudinary.uploader.destroy(public_id, resource_type= 'image')
    console.log("Assets is deleted from cloud",result);
    
  } catch (exception) {
    console.log("error while deleting from cloud",exception);
    throw(exception);
  }
}

module.exports={uploadImage,deleteImage};
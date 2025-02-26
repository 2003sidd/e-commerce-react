// import { v2 as cloudinary } from 'cloudinary';
const {v2} = require("cloudinary");
const fs = require("fs")



// Configuration
v2.config({
    cloud_name: 'dyj7pkfjf',
    api_key: '744769127271784',
    api_secret: '75ea5SWbeWHcOtLk1bnky5cpuzw' // Click 'View API Keys' above to copy your API secret
});

// Upload image function
const uploadDocument = async (uploadFile) => {
    try {
        // Check if file exists
        if (!fs.existsSync(uploadFile)) {
            throw new Error("File not found");
        }

        const uploadResult = await v2.uploader.upload(uploadFile, {
            resource_type: "image" // Ensuring it's treated as an image
        });

        console.log("Upload successful:", uploadResult); // Logs the upload result (URL, public_id, etc.)
        return uploadResult;

    } catch (error) {
        console.error("Upload failed:", error); // Logs any errors encountered
        if (fs.existsSync(uploadFile)) {
            fs.unlinkSync(uploadFile); // Removes the file from the local system if needed
        }
        return null;
    }
};

// URL optimization function (with dynamic options)
const optimizeUrl = (publicId, options = {}) => {
    return v2.url(publicId, {
        fetch_format: options.fetch_format || 'auto',
        quality: options.quality || 'auto',
        ...options // Allow additional transformations like width, height, etc.
    });
};

// URL transformation function (auto-crop and resize)
const autoCropUrl = (publicId, width = 500, height = 500) => {
    return v2.url(publicId, {
        crop: 'fill', // Use 'fill' to ensure it fills the box
        gravity: 'auto',
        width,
        height,
    });
};

module.exports = { uploadDocument, optimizeUrl, autoCropUrl };

const brandModal = require("../modals/brand-modal");
const mongoose = require("mongoose");
const uploadDocument = require("../utils/cloudnary")
const { ApiResponse } = require("../utils/ApiResponse");
const { ApiError } = require("../utils/ApiError")
const { DATA_NOT_FOUND, INTERNAL_SERVER_ERROR, BAD_REQUEST, NO_CONTENT_FOUND } = require("../utils/constant");
const { upload } = require("../utils/multer");

// get api for the category
const getAllBrand = async (req, res) => {

    const { index, top, searchBy, isPagination } = req.body;

    // Check if pagination is needed
    if (typeof isPagination == "undefined" || !isPagination) {
        try {
            const data = await brandModal.find();
            const count = await brandModal.countDocuments();
            if (data.length === 0) {
                return res.json(new ApiResponse(200, null, DATA_NOT_FOUND));
            }
            return res.json(new ApiResponse(200, { data, count }, "data found"));
        } catch (error) {
            return res.status(500).json(new ApiResponse(500, null, "Internal server error"));
        }
    }

    // Check if pagination parameters are present
    if (typeof index === "undefined" || typeof top === "undefined") {
        return res.json(new ApiResponse(400, null, "index and top are required"));
    }

    const skip = (index - 1) * top;

    try {
        let data, count;

        // Check if searchBy is provided
        if (!searchBy || searchBy.trim() === "") {
            data = await brandModal.find().skip(skip).limit(top);
            count = await brandModal.countDocuments();
        } else {
            data = await brandModal.aggregate([
                { $match: { name: { $regex: searchBy, $options: 'i' } } },
                { $skip: skip },
                { $limit: top }
            ]);
            count = await brandModal.countDocuments({ name: { $regex: searchBy, $options: 'i' } });
        }

        if (data.length === 0) {
            return res.json(new ApiResponse(200, null, DATA_NOT_FOUND));
        }

        return res.json(new ApiResponse(200, { data, count }, "data found"));

    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, "Internal server error"));
    }
};


// delete api for deleting a category
const deleteBrand = async (req, res) => {
    try {
        const _id = req.params.id;
        const data = await brandModal.findByIdAndDelete({ _id });
        if (data) {
            res.json(new ApiResponse(200, data, "deleted successfully"));
        } else {
            res.json(new ApiResponse(204, null, NO_CONTENT_FOUND));
        }
    } catch (error) {
        console.log("error", Error)

        res.json(new ApiResponse(500, Error, INTERNAL_SERVER_ERROR));
    }
}

const updateBrand = async (req, res) => {
    try {
        const _id = req.params.id;

        // Check if ID is provided and is valid
        if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
            return res.json(new ApiResponse(400, null, !_id ? 'ID parameter is missing' : 'Invalid ID format'));
        }

        // Extract the update data from the request body
        const updateData = req.body;

        if (!updateBrand.name || updateBrand.name.trim() === "") {
            return res.json(new ApiResponse(400, null, "Name is required field"));
        }

        if (!updateBrand.image || updateBrand.image.trim() === "") {
            return res.json(new ApiResponse(400, null, "Name is required field"));
        }

        // Find and update the category
        const updatedBrand = await brandModal.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true });

        if (updatedBrand) {
            res.json(new ApiResponse(200, updatedBrand, "Updated successfully"));
        } else {
            res.json(new ApiResponse(404, null, 'Brand not found'));
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.json(new ApiResponse(500, null, 'Internal server error'));
    }
}


const getBrandById = async (req, res) => {
    try {
        const { id } = req.params;
        // Check if ID is provided
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.json(new ApiResponse(400, null, !id ? 'ID parameter is missing' : 'Invalid ID format',));
        }

        // Find the category by ID
        const data = await brandModal.findById(id);

        // Check if data is found
        if (data) {
            res.json(new ApiResponse(200, data, "Data found"));
        } else {
            res.json(new ApiResponse(400, null, BAD_REQUEST));
        }
    } catch (error) {
        res.json(new ApiResponse(500, Error, INTERNAL_SERVER_ERROR));
    }
}


const addBrand = async (req, res) => {
    try {
        const { name } = req.body;
        console.log("req file", req.file);


        const existingBrand = await brandModal.findOne({ name });

        if (existingBrand) {
            // If brand exists, return an error message
            return res.status(400).json(new ApiError(400, "Brand not exist",null));
        }

        //check name
        if (typeof name == "undefined" || name.trim() === "") {
         return   res.json(new ApiResponse(400, null, "provide name"));
        }

        const coverImageLocalPath = req.file?.path

        if (!coverImageLocalPath) {
            return new ApiError(400, "Cover image file is missing")
        }

        const image = await uploadDocument.uploadDocument(coverImageLocalPath);
        const data = await brandModal.create({ name, image: image.url });
        if (data) {
            res.json(new ApiResponse(201, data, "created successfully"));
        } else {
            res.json(new ApiResponse(204, null, "failed"));
        }
    } catch (Error) {
        console.log("error", Error)
        res.json(new ApiResponse(500, Error, INTERNAL_SERVER_ERROR));
    }
}

module.exports = { getAllBrand, addBrand, getBrandById, deleteBrand, updateBrand };

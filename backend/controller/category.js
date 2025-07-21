const categoryModal = require("../modals/category-modal");
const mongoose = require("mongoose");
const { ApiResponse } = require("../utils/ApiResponse");
const { DATA_NOT_FOUND, INTERNAL_SERVER_ERROR, BAD_REQUEST, NO_CONTENT_FOUND } = require("../utils/constant");
const { uploadDocument } = require("../utils/cloudnary");
const { ApiError } = require("../utils/ApiError");

// get api for the category
const getAllCateory = async (req, res) => {
    try {
        
        const { index, top, searchBy, isPagination } = req.body;
        if (typeof isPagination === "undefined" || !isPagination) {
            const data = await categoryModal.find();
            const count = await categoryModal.countDocuments();

            if (data.length == 0) {
                return res.json(new ApiResponse(200, null, DATA_NOT_FOUND));
            } else {
                return res.json(new ApiResponse(200, { data, count }, "data found"));
            }
        }

        if (typeof index === "undefined" || typeof top === "undefined") {
            return res.json(new ApiResponse(400, null, "index and top are required"));
        }
        let skip = top * (index - 1);
        let data, count;
        if (!searchBy || searchBy.trim() === "") {
            data = await categoryModal.find().skip(skip).limit(top);
            count = await categoryModal.countDocuments();
        } else {
            data = await categoryModal.aggregate([
                { $match: { name: { $regex: searchBy, $options: 'i' } } },
                { $skip: skip },
                { $limit: top }
            ]);
            count = await categoryModal.countDocuments({ name: { $regex: searchBy, $options: 'i' } });
        }


        if (data.length === 0) {
            return res.json(new ApiResponse(200, null, DATA_NOT_FOUND));
        }

        return res.json(new ApiResponse(200, { data, count }, "data found"));
        // const data = await categoryModal.find();

    } catch (Error) {
        res.json(new ApiResponse(500, Error, INTERNAL_SERVER_ERROR));
    }
};


// delete api for deleting a category
const deleteCategory = async (req, res) => {
    try {
        const _id = req.params.id;
        const data = await categoryModal.findByIdAndDelete({ _id });
        if (data) {
            res.json(new ApiResponse(200, data, "deleted successfully"));
        } else {
            res.json(new ApiResponse(204, null, NO_CONTENT_FOUND));
        }
    } catch (error) {
        res.json(new ApiResponse(500, Error, INTERNAL_SERVER_ERROR));
    }
}

const updateCategory = async (req, res) => {
    try {
        const _id = req.params.id;

        // Check if ID is provided and is valid
        if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
            return res.json(new ApiResponse(400, null, !_id ? 'ID parameter is missing' : 'Invalid ID format'));
        }

        // Extract the update data from the request body
        const updateData = req.body;

        // Find and update the category
        const updatedCategory = await categoryModal.findByIdAndUpdate(_id, updateData, {
            new: true, // return the updated document
            runValidators: true // validate before updating
        });

        if (updatedCategory) {
            res.json(new ApiResponse(200, updatedCategory, "Updated successfully"));
        } else {
            res.json(new ApiResponse(404, null, 'Category not found'));
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.json(new ApiResponse(500, null, 'Internal server error'));
    }
}


const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        // Check if ID is provided
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            res.json(new ApiResponse(400, null, !id ? 'ID parameter is missing' : 'Invalid ID format',));
        }

        // Find the category by ID
        const data = await categoryModal.findById(id);


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


const addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        console.log("name is",name)

        //check name
        if (typeof name == "undefined" || name.trim() === "") {
            return res.json(new ApiResponse(400, null, "provide name"));
        }

        const colorImage = req.file?.path

        if (!colorImage) {
            throw new ApiError(400, "Cover image file is missing")
        }

        const image = await uploadDocument(colorImage);
       

        const data = await categoryModal.create({ name,image:image.url });
        if (data) {
            return res.json(new ApiResponse(201, data, "created successfully"));
        } else {
            return res.json(new ApiResponse(204, null, "failed"));
        }
    } catch (Error) {
        console.log("error",Error)
        return res.json(new ApiResponse(500, Error, INTERNAL_SERVER_ERROR));
    }
}

module.exports = { getAllCateory, addCategory, getCategoryById, deleteCategory, updateCategory };

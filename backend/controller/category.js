const categoryModal = require("../modals/category.modal");
const mongoose = require("mongoose");
const { ApiResponse } = require("../utils/ApiResponse");
const { DATA_NOT_FOUND, INTERNAL_SERVER_ERROR, BAD_REQUEST, NO_CONTENT_FOUND } = require("../utils/constant");

// get api for the category
const getAllCateory = async (req, res) => {
    try {
        const data = await categoryModal.find();

        if (data.length == 0) {
            res.json(new ApiResponse(200, null, DATA_NOT_FOUND));
        } else {
            res.json(new ApiResponse(200, data, "data found"));
        }
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
        // Check if ID is provided

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.json(new ApiResponse(400, null, !id ? 'ID parameter is missing' : 'Invalid ID format'));
        }

        const data = await categoryModal.findByIdAndUpdate(id);

        if (data) {
            res.json(new ApiResponse(200, data, "update sucessfully"));
        } else {
            res.json(new ApiResponse(400, null, BAD_REQUEST));
        }
    } catch (error) {
        res.json(new ApiResponse(500, Error, INTERNAL_SERVER_ERROR));
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

        //check name
        if (typeof name == "undefined" || name.trim() === "") {
            res.json(new ApiResponse(400, null, "provide name"));
        }

        const data = await categoryModal.create({ name });
        if (data) {
            res.json(new ApiResponse(201, data, "created successfully"));
        } else {
            res.json(new ApiResponse(204, null, "failed"));
        }
    } catch (Error) {
        res.json(new ApiResponse(500, Error, INTERNAL_SERVER_ERROR));
    }
}

module.exports = { getAllCateory, addCategory, getCategoryById, deleteCategory, updateCategory };

const { sizeModal } = require("../modals/size.modal");
const mongoose = require("mongoose");
const { ApiResponse } = require("../utils/ApiResponse");
const { DATA_NOT_FOUND, INTERNAL_SERVER_ERROR, BAD_REQUEST, NO_CONTENT_FOUND } = require("../utils/constant");

// get api for all the size
const getAllSize = async (req, res) => {
    try {
        const data = await sizeModal.find();
  
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
const deleteSize = async (req, res) => {
    try {
        const _id = req.params.id;
        const data = await sizeModal.findByIdAndDelete({ _id });
        if (data) {
            res.json(new ApiResponse(200, data, "deleted successfully"));
        } else {
            res.json(new ApiResponse(204, null, NO_CONTENT_FOUND));
        }
    } catch (error) {
        res.json(new ApiResponse(500, Error, INTERNAL_SERVER_ERROR));
    }
}

const updateSize = async (req, res) => {
    try {
        const _id = req.params.id;
        // Check if ID is provided
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.json(new ApiResponse(400, null ,id?"Invalid ID format":"ID paramter is missing"));
        }

        const data = await sizeModal.findByIdAndUpdate(id);

        if (data) {
            res.json(new ApiResponse(200, data, "update sucessfully"));
        } else {
            res.json(new ApiResponse(400, null, BAD_REQUEST));
        }

    } catch (error) {
        res.json(new ApiResponse(500, Error, INTERNAL_SERVER_ERROR));
    }
}

const getSizeById = async (req, res) => {
    try {
        const { id } = req.params;
        // Check if ID is provided
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.json(new ApiResponse(400, null ,id?"Invalid ID format":"ID paramter is missing"));
        }


        // Find the category by ID
        const data = await sizeModal.findById(id);

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

const addSize = async (req, res) => {
    try {
        const { name } = req.body;

        //check name
        if (typeof name == "undefined" || name.trim() === "") {
            res.json(new ApiResponse(400, null, "provide name"));
        }

        const data = await sizeModal.create({ name });
        if (data) {
            res.json(new ApiResponse(201, data, "created successfully"));
        } else {
            res.json(new ApiResponse(204, null, "failed"));
        }
    } catch (Error) {
        res.json(new ApiResponse(500, Error, INTERNAL_SERVER_ERROR));
    }
}


module.exports = { getAllSize, addSize, getSizeById, deleteSize, updateSize };
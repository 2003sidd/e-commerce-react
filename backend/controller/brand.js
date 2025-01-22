const brandModal = require("../modals/brand-modal");
const mongoose = require("mongoose");
const { ApiResponse } = require("../utils/ApiResponse");
const { DATA_NOT_FOUND, INTERNAL_SERVER_ERROR, BAD_REQUEST, NO_CONTENT_FOUND } = require("../utils/constant");

// get api for the category
const getAllBrand = async (req, res) => {
    try {
        const { index, top, searchBy } = req.body;
        if (typeof index == "undefined" || typeof top == "undefined") {
            res.json(new ApiResponse(400, null, "index and top is required"));
        }

        const skip = (index - 1) * top;

        let data, count;

        if (typeof searchBy == "undefined" || searchBy.trim() === "") {
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

        if (data.length == 0) {
            res.json(new ApiResponse(200, null, DATA_NOT_FOUND));
        } else {
            res.json(new ApiResponse(200, {
                "data": data,
                "count": count
            }, "data found"));
        }
    } catch (Error) {
        console.log("error", Error)
        res.json(new ApiResponse(500, Error, INTERNAL_SERVER_ERROR));
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

        // Find and update the category
        const updatedBrand = await brandModal.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true});

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

        //check name
        if (typeof name == "undefined" || name.trim() === "") {
            res.json(new ApiResponse(400, null, "provide name"));
        }

        const data = await brandModal.create({ name });
        if (data) {
            res.json(new ApiResponse(201, data, "created successfully"));
        } else {
            res.json(new ApiResponse(204, null, "failed"));
        }
    } catch (Error) {
        res.json(new ApiResponse(500, Error, INTERNAL_SERVER_ERROR));
    }
}

module.exports = { getAllBrand, addBrand, getBrandById, deleteBrand, updateBrand };

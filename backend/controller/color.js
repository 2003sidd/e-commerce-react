const { colorModal } = require("../modals/color.modal");
const { ApiResponse } = require("../utils/ApiResponse");
const { INTERNAL_SERVER_ERROR } = require("../utils/constant");


// get api for the category
const getAllColor = async (req, res) => {
    try {
        const data = await colorModal.find();

        if (data.length == 0) {
            res.json(new ApiResponse(200, null, DATA_NOT_FOUND));
        } else {
            res.json(new ApiResponse(200, data, "data found"));
        }
    } catch (Error) {
        res.json(new ApiResponse(500, Error.error, INTERNAL_SERVER_ERROR));
    }
};


// delete api for deleting a category
const deleteColor = async (req, res) => {
    try {
        const _id = req.params.id;
        const data = await colorModal.findByIdAndDelete({ _id });
        if (data) {
            res.json(new ApiResponse(200, data, "deleted successfully"));
        } else {
            res.json(new ApiResponse(204, null, NO_CONTENT_FOUND));
        }
    } catch (error) {
        res.json(new ApiResponse(500, Error, INTERNAL_SERVER_ERROR));
    }
}

const updateColor = async (req, res) => {
    try {
        const _id = req.params.id;
        // Check if ID is provided

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.json(new ApiResponse(400, null, !id ? 'ID parameter is missing' : 'Invalid ID format'));
        }

        const data = await colorModal.findByIdAndUpdate(id);

        if (data) {
            res.json(new ApiResponse(200, data, "update sucessfully"));
        } else {
            res.json(new ApiResponse(400, null, BAD_REQUEST));
        }
    } catch (error) {
        res.json(new ApiResponse(500, Error, INTERNAL_SERVER_ERROR));
    }
}

const getColorById = async (req, res) => {
    try {
        const { id } = req.params;
        // Check if ID is provided
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            res.json(new ApiResponse(400, null, !id ? 'ID parameter is missing' : 'Invalid ID format',));
        }
        console.log("id is",id);

        // Find the category by ID
        const data = await colorModal.findById(id);

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


const addColor = async (req, res) => {
    try {
        const { name,image } = req.body;

     

        const data = await colorModal.create({ name ,image});
        if (data) {
            res.json(new ApiResponse(201, data, "created successfully"));
        } else {
            res.json(new ApiResponse(204, null, "failed"));
        }
    } catch (Error) {
        res.json(new ApiResponse(500, Error, INTERNAL_SERVER_ERROR));
    }
}
const addSize = async (req, res) => {
    try {
        const { name,image } = req.body;

        //check name
        // if (typeof name == "undefined" || name.trim() === "") {
        //     res.json(new ApiResponse(400, null, "provide name"));
        // }

        const data = await colorModal.create({ name });
        if (data) {
            res.json(new ApiResponse(201, data, "created successfully"));
        } else {
            res.json(new ApiResponse(204, null, "failed"));
        }
    } catch (Error) {
        res.json(new ApiResponse(500, Error, INTERNAL_SERVER_ERROR));
    }
}


module.exports = { addColor, getColorById, updateColor, deleteColor, getAllColor };
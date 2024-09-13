const categoryModal = require("../modals/category.modal");
const mongoose = require("mongoose");

const getAllCateory = async (req, res) => {
    const data = await categoryModal.find();
    if (data.length == 0) {
        res.json({
            status: 200,
            message: "data not found",
            data: null
        });
    } else {
        res.json({
            status: 200,
            message: "data found",
            data: data
        });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const _id = req.params.id;
        const data = await categoryModal.findByIdAndDelete({ _id });
        if (data) {
            res.json({
                status: 202,
                message: "deleted successfully",
                data: null
            });
        } else {
            res.json({
                status: 500,
                message: "deleted unsuccessfully",
                data: null
            });
        }
    } catch (error) {
        console.log(error);
    }
}

const updateCategory = async (req, res) => {
    try {
        const _id = req.params.id;
        // Check if ID is provided
        if (!id) {
            return res.status(400).json({
                status: 400,
                message: 'ID parameter is missing',
                data: null
            });
        }
        // Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: 400,
                message: 'Invalid ID format',
                data: null
            });
        }
        const data = await categoryModal.findByIdAndUpdate(id);
    } catch (error) {
        console.log(error);
    }
}

const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        // Check if ID is provided
        if (!id) {
            return res.status(400).json({
                status: 400,
                message: 'ID parameter is missing',
                data: null
            });
        }
        // Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: 400,
                message: 'Invalid ID format',
                data: null
            });
        }

        // Find the category by ID
        const data = await categoryModal.findById(id);

        // Check if data is found
        if (!data) {
            return res.status(404).json({
                status: 404,
                message: 'Data not found',
                data: null
            });
        }

        // Return the found data
        res.json({
            status: 200,
            message: 'Data found',
            data: data
        });
    } catch (error) {
        // Log the error and send a generic error message
        console.error('Error retrieving category by ID:', error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error',
            data: null
        });
    }
}


const addCategory = async (req, res) => {
    console.log("name is",req)
    const { name,image } = req.body;

    //check name
    if (typeof name == "undefined" || name.trim() === "") {
        console.log("condtition satisfied");
        res.json({
            status: 400,
            message: "provide name",
            data: null
        })
        return;
    }

    if (typeof image == "undefined" || image.trim() === "") {
        console.log("condtition satisfied");
        res.json({
            status: 400,
            message: "provide image",
            data: null
        })
        return;
    }
    const data = await categoryModal.create({ name });
    if (data) {
        res.json({
            status: 204,
            message: "created successfully",
            data: data
        })
    } else {
        res.json({
            status: 500,
            message: "failed",
            data: data
        })
    }

}

module.exports = { getAllCateory, addCategory, getCategoryById, deleteCategory };

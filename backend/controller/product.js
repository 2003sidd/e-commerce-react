const { productModal } = require("../modals/product.modal");
const { ApiResponse } = require("../utils/ApiResponse");
const { INTERNAL_SERVER_ERROR, NO_CONTENT_FOUND } = require("../utils/constant");


const getAllProduct = async (req, res) => {
    try {
        const data = await productModal.find();
        if (data.length == 0) {
            res.json(new ApiResponse(200, null, NO_CONTENT_FOUND));
        } else {
            res.json(new ApiResponse(200, data, "data found"));
        }
    } catch (error) {
        res.json(new ApiResponse(500, null, INTERNAL_SERVER_ERROR));
    }
};

const deleteProduct = async (req, res) => {
    try {
        const _id = req.params.id;
        const data = await productModal.findByIdAndDelete({ _id });
        if (data) {
            res.json(new ApiResponse(200, data, "deleted successfully"));

        } else {
            res.json(new ApiResponse(200, data, "deleted unsuccessfully"));
        }
    } catch (error) {
        res.json(new ApiResponse(500, null, INTERNAL_SERVER_ERROR));
    }
}

const updateProduct = async (req, res) => {
    try {
        const _id = req.params.id;
    } catch (error) {
        console.log(error);
    }
}

const getProductById = async (req, res) => {
    try {
        const _id = req.params.id;
        const data = await productModal.findById({ _id });
        if (data) {
            res.json({
                status: 200,
                message: "data found",
                data: data
            });
        }
        res.json(new ApiResponse(500, null, INTERNAL_SERVER_ERROR));
        res.json({
            status: 200,
            message: "data not found",
            data: null
        });
    } catch (error) {
        res.json(new ApiResponse(500, null, INTERNAL_SERVER_ERROR));
    }

}


const addProduct = async (req, res) => {
    const { name } = req.body;
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
module.exports = { getAllProduct, addProduct, getProductById, updateProduct, deleteProduct };
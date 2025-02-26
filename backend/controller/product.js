const { productModal } = require("../modals/product-modal");
const { ApiResponse } = require("../utils/ApiResponse");
const { INTERNAL_SERVER_ERROR, NO_CONTENT_FOUND } = require("../utils/constant");
const { validateFields } = require("../utils/checkRequiredFields")


const getAllProduct = async (req, res) => {
    try {

        const { top, index, searchBy, isPagination } = req.body;

        if (typeof isPagination === "undefined" || !isPagination) {
            const data = await productModal.find();
            const count = await productModal.countDocuments();
            if (data.length == 0) {
                res.json(new ApiResponse(200, null, NO_CONTENT_FOUND));
            } else {
                res.json(new ApiResponse(200, { data, count }, "data found"));
            }
        }

        if (typeof top === "undefined" || typeof index === "undefined") {
            return res.json(new ApiResponse(400, null, "top and index is required fields"))
        }
        let skip = (index - 1) * top;
        let data, count;
        if (!searchBy || searchBy.trim() === "") {
            data = await productModal.find();
            count = await productModal.countDocuments();
        } else {

            data = await productModal.aggregate([
                { $match: { name: { $regex: searchBy, $options: 'i' } } },
                { $skip: skip },
                { $limit: top }
            ]);
            count = await productModal.countDocuments();
        }

        if (data.length === 0) {
            return res.json(new ApiResponse(200, null, "no data found"))
        }
        return res.json(new ApiResponse(200, { data, count }, "Data found"))
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
    try {
        const { name, descripation, category, gender, varient } = req.body;
        if (typeof name == "undefined" || name.trim() === "") {
            return res.json(new ApiResponse(400, null, "provide name"));
        }
        if (typeof descripation == "undefined" || descripation.trim() === "") {
            return res.json(new ApiResponse(400, null, "provide descripation"));
        }
        if (typeof category == "undefined" || category.trim() === "") {
            return res.json(new ApiResponse(400, null, "provide category"));
        }
        if (typeof gender == "undefined" || gender.trim() === "") {
            return res.json(new ApiResponse(400, null, "provide gender"));
        }
        if (typeof varient == "undefined" || varient.trim() === "") {
            return res.json(new ApiResponse(400, null, "provide varient"));
        }

        if (typeof varient == "undefined" && varient !== null && Array.isArray(varient) && varient.length <= 0) {
            return res.json(new ApiResponse(400, null, "provide varient"));
        }


        for (let i = 0; i < varient.length; i++) {
            const v = variant[i];

            if (!v.size || !Array.isArray(v.size) || v.size.length === 0) {
                return res.json(new ApiResponse(400, null, `Variant ${i + 1}: Provide valid size`));
            }

            if (!v.color || typeof v.color !== "string" || v.color.trim() === "") {
                return res.json(new ApiResponse(400, null, `Variant ${i + 1}: Provide valid color`));
            }

            if (!v.image || !Array.isArray(v.image) || v.image.length === 0) {
                return res.json(new ApiResponse(400, null, `Variant ${i + 1}: Provide at least one image`));
            }

            if (typeof v.price !== "number" || v.price <= 0) {
                return res.json(new ApiResponse(400, null, `Variant ${i + 1}: Provide a valid price`));
            }

            if (typeof v.stock !== "number" || v.stock < 0) {
                return res.json(new ApiResponse(400, null, `Variant ${i + 1}: Provide valid stock quantity`));
            }
        }



        const data = await productModal.create({ name, descripation, gender, varient, category });
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
    } catch (error) {
        res.json(new ApiResponse(500, error, INTERNAL_SERVER_ERROR));

    }

}
module.exports = { getAllProduct, addProduct, getProductById, updateProduct, deleteProduct };
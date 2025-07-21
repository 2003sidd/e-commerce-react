const { mongo } = require("mongoose");
const CartModal = require("../modals/cart-modal");
const { ApiError } = require("../utils/ApiError");
const { INTERNAL_SERVER_ERROR } = require("../utils/constant");
const { ApiResponse } = require("../utils/ApiResponse");



const addItemIntoCart = async (req, res) => {
    try {
        const { productVarientId, quantity, userId } = req.body;

        // Validate quantity
        if (!quantity || quantity <= 0) {
            return res.status(400).json({ error: 'Enter quantity greater than zero' });
        }

        // Check if item already exists
        const itemExist = await CartModal.findOne({ productVarientId, userId });

        if (itemExist) {
            itemExist.quantity = quantity;
            await itemExist.save();
            return res.json(new ApiResponse(200, null, "Item updated in cart successfully"));
        } else {
            const newData = await CartModal.create({ productVarientId, quantity, userId });
            if (newData) {
                return res.json(new ApiResponse(200, null, "Item added in cart successfully"));
            } else {
                return res.status(500).json(new ApiResponse(500, null, "Error occurred during adding item in cart"));
            }
        }
    } catch (error) {
        console.log("Error is", error);
        return res.status(500).json(new ApiError(500, null, "INTERNAL_SERVER_ERROR"));
    }
}



const removeCartItem = async (req, res) => {
    try {
        const { productVarientId, userId } = req.body;

        const cartItem = await CartModal.findOne({ productVarientId, userId });
        if (cartItem) {
            const data = await CartModal.findByIdAndDelete(cartItem._id)

            if (data) {
                return res.json(new ApiResponse(200, null, "Item removed from cart"));
            } else {
                return res.status(500).json(new ApiResponse(200, null, "Error occured during removed from cart.please try again later"));

            }
        } else {
            return res.status(400).json(new ApiResponse(200, null, "Cart item not found"));

        }
    } catch (error) {
        console.log("Error is", error);
        return res.status(500).json(new ApiError(500, null, "Something went wrong"));

    }
}


const deleteCartItems = async (req, res) => {
    try {
        const { userId } = req.body;

        const result = await CartModal.deleteMany({ userId });

        if (result.deletedCount > 0) {
            return res.status(200).json(new ApiResponse(200, null, "All cart items removed successfully"));
        } else {
            return res.status(404).json(new ApiResponse(404, null, "No cart items found to delete"));
        }

    } catch (error) {
        console.log("Error is", error);
        return res.status(500).json(new ApiError(500, null, "INTERNAL_SERVER_ERROR"));
    }
};


const getCartItem = async (req, res) => {
    try {
        const { userId } = req.params;


        const data = await CartModal.find({ userId });
        if (data && data.length > 0) {
            return res.status(200).json(new ApiResponse(200, data, "Cart item found"))
        } else {
            return res.status(404).json(new ApiResponse(404, null, "Cart item not found"))

        }
    } catch (error) {
        console.log("Error is", error);
        return res.status(500).json(new ApiError(500, null, INTERNAL_SERVER_ERROR))

    }
}

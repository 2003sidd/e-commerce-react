const addressModal = require("../modals/address-modal");
const { ApiResponse } = require("../utils/ApiResponse");
const { INTERNAL_SERVER_ERROR } = require("../utils/constant");

const addAddress = async (req, res) => {
    try {
        const { name, number, userId } = req.body;

        if (!name || typeof name !== 'string' || name.trim().length < 2) {
            return res.status(400).json({ error: 'Name is required and must be at least 2 characters.' });
        }

        const numberRegex = /^[0-9]{10}$/; // Example: for 10-digit phone numbers
        if (!number || !numberRegex.test(number)) {
            return res.status(400).json({ error: 'A valid 10-digit phone number is required.' });
        }

        if (!id || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.json(new ApiResponse(400, null, userId ? "Invalid ID format" : "ID paramter is missing"));
        }

        const data = await addressModal.create({ name, number, userId });
        if (data) {
            return res.json(new ApiResponse(201, data, "Address created "));
        } else {
            return res.json(new ApiResponse(200, null, "Address not created"))
        }
    } catch (error) {
        console.log("error", Error)

        res.json(new ApiResponse(500, Error, INTERNAL_SERVER_ERROR));
    }
}


const getAddresses = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!id || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.json(new ApiResponse(400, null, userId ? "Invalid ID format" : "ID paramter is missing"));
        }
        const data = await addressModal.find({ userId });

        if (data) {
            res.json(new ApiResponse(200, data, "Address found"));
        } else {
            res.json(new ApiResponse(200, null, "Address not found"));

        }
    } catch (error) {
        console.log("error", Error)

        res.json(new ApiResponse(500, Error, INTERNAL_SERVER_ERROR));
    }
}


const getAddressById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.json(new ApiResponse(400, null, id ? "Invalid ID format" : "ID paramter is missing"));
        }

        const data = await addressModal.findById(id);
        if (data) {
            res.json(new ApiResponse(200, data, "Address found"));
        } else {
            res.json(new ApiResponse(200, null, "Address not found"));

        }
    } catch (error) {
        console.log("error", Error)

        res.json(new ApiResponse(500, Error, INTERNAL_SERVER_ERROR));
    }
}


const updateAddress = async (req, res) => {
    try {

    } catch (error) {
        console.log("error", Error)

        res.json(new ApiResponse(500, Error, INTERNAL_SERVER_ERROR));
    }
}


const deleteAddress = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.json(new ApiResponse(400, null, id ? "Invalid ID format" : "ID paramter is missing"));
        }

        const data = await addressModal.findByIdAndDelete(id);
        if (data) {
            res.json(new ApiResponse(200, data, "Address deleted successfully"));
        } else {
            res.json(new ApiResponse(200, null, "Address deleted successfully"));

        }
    } catch (error) {
        console.log("error", Error)

        res.json(new ApiResponse(500, Error, INTERNAL_SERVER_ERROR));
    }
}


module.exports = { addAddress, getAddresses, getAddressById, deleteAddress, updateAddress };

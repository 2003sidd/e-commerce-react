const { colorModal } = require("../modals/color-modal");
const { ApiResponse } = require("../utils/ApiResponse");
const {sizeModal} = require("../modals/size-modal");
const categoryModal = require("../modals//category-modal");
const brandModal = require("../modals/brand-modal");
const { INTERNAL_SERVER_ERROR } = require("../utils/constant");

const getData = async(req,res)=> {
    try{
            let data={};
          
            data.color = await colorModal.find()
            data.size = await sizeModal.find()
            data.category = await categoryModal.find()
            data.brand = await brandModal.find()
            res.json (new ApiResponse(200,data,""))

    }catch(exception){
        console.log(exception)
        res.json(new ApiResponse(500, Error.error, INTERNAL_SERVER_ERROR));
    }
}

module.exports = {getData}
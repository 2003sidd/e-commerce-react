const express=require("express");
const { getAllCateory, addCategory,getCategoryById, deleteCategory } = require("../controller/category");
const { addSize,deleteSize,getAllSize,getSizeById,updateSize} = require("../controller/size");
const { getAllColor, getColorById, addColor, updateColor, deleteColor } = require("../controller/color");
const  router= express.Router();

router.route('/').get(async (req,resp)=>{
    resp.end("it work well")
});

router.route('/user').post(async (req,resp)=>{
    console.log("reeq is ", req);
    console.log("reeq is ", req.body);
    resp.end(JSON.stringify(req.body));
})


// routes related to category CRUD
router.route('/category').get(getAllCateory);
router.route('/category/:id').get(getCategoryById);
router.route('/AddCategory').post(addCategory);
router.route('/deleteCategory/:id').delete(deleteCategory);

// routes related to size CRUD
router.route('/size').get(getAllSize);
router.route('/sizeById/:id').get(getSizeById);
router.route('/addSize').post(addSize);
router.route('/updateSize').post(updateSize);
router.route('/deleteSize/:id').delete(deleteSize);



// routes related to color CRUD
router.route('/color').get(getAllColor);
router.route('/colorById/:id').get(getColorById);
router.route('/addColor').post(addColor);
router.route('/updateColor').post(updateColor);
router.route('/deleteColor/:id').delete(deleteColor);

module.exports=router;
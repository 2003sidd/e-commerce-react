const express=require("express");
const { getAllCateory, addCategory,getCategoryById, deleteCategory, updateCategory } = require("../controller/category");
const { addSize,deleteSize,getAllSize,getSizeById,updateSize, getSizes} = require("../controller/size");
const { getAllColor, getColorById, addColor, updateColor, deleteColor } = require("../controller/color");
const { deleteBrand, updateBrand, addBrand, getBrandById, getAllBrand } = require("../controller/brand");
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
router.route('/updateCategory/:id').get(updateCategory);
router.route('/AddCategory').post(addCategory);
router.route('/deleteCategory/:id').delete(deleteCategory);

// routes related to size CRUD
router.route('/size').get(getAllSize);
router.route('/size').post(getSizes);
router.route('/sizeById/:id').get(getSizeById);
router.route('/addSize').post(addSize);
router.route('/updateSize/:id').post(updateSize);
router.route('/deleteSize/:id').delete(deleteSize);

// routes related to color CRUD
router.route('/color').get(getAllColor);
router.route('/colorById/:id').get(getColorById);
router.route('/addColor').post(addColor);
router.route('/updateColor/:id').post(updateColor);
router.route('/deleteColor/:id').delete(deleteColor);

// routes related to brand CRUD
router.route('/brand').get(getAllBrand);
router.route('/brandById/:id').get(getBrandById);
router.route('/addbrand').post(addBrand);
router.route('/updatebrand/:id').post(updateBrand);
router.route('/deletebrand/:id').delete(deleteBrand);

module.exports=router;
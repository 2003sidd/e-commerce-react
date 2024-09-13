const express=require("express");
const { getAllCateory, addCategory,getCategoryById, deleteCategory } = require("../controller/category");
const  router= express.Router();

router.route('/').get(async (req,resp)=>{
    resp.end("it work well")
});

router.route('/user').post(async (req,resp)=>{
    console.log("reeq is ", req);
    console.log("reeq is ", req.body);
    resp.end(JSON.stringify(req.body));
})

router.route('/category').get(getAllCateory);
router.route('/category/:id').get(getCategoryById);
router.route('/AddCategory').post(addCategory);
router.route('/deleteCategory/:id').delete(deleteCategory);

module.exports=router;
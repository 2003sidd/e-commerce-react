const express = require("express");
const { getAllCateory, addCategory, getCategoryById, deleteCategory, updateCategory } = require("../controller/category");
const { addSize, deleteSize, getAllSize, getSizeById, updateSize, getSizes } = require("../controller/size");
const { getAllColor, getColorById, addColor, updateColor, deleteColor } = require("../controller/color");
const { deleteBrand, updateBrand, addBrand, getBrandById, getAllBrand } = require("../controller/brand");
const { jwtAuthMiddleware } = require("../utils/jwt");
const { addProduct, getAllProduct, getProductById, updateProduct } = require("../controller/product");
const {getData} = require("../controller/master")
const categoryModal = require("../modals/category-modal");
const router = express.Router();

const {upload} = require("../utils/multer")

router.route('/').get(async (req, resp) => {
    resp.end("it work well")
});

router.route('/user').post(async (req, resp) => {
    console.log("reeq is ", req);
    console.log("reeq is ", req.body);
    resp.end(JSON.stringify(req.body));
})

// routes related to category CRUD
/**
 * @swagger
* /api/category:
 * get:
*    description: Retrieves a list of all categories from the database.
*    responses:
*      200:
*        description: Successful retrieval of categories.
*        content:
*          application/json:
*            schema:
*              type: object
*              properties: 
*                statusCode:
*                  type: integer
*                  example: 200
*                data:
*                  type: array
*                  items:
*                    $ref: '#/modals/category-modal' 
*                message:
*                  type: string
*                  example: "data found"
                  */
router.route('/category').get( getAllCateory);
router.route('/category/:id').get(getCategoryById);
router.route('/updateCategory/:id').get(updateCategory);
router.route('/AddCategory').post(addCategory);
router.route('/deleteCategory/:id').delete( deleteCategory);

// routes related to size CRUD
router.route('/size').get( getAllSize);
router.route('/size').post( getSizes);
router.route('/sizeById/:id').get( getSizeById);
router.route('/addSize').post( addSize);
router.route('/updateSize/:id').post( updateSize);
router.route('/deleteSize/:id').delete( deleteSize);

// routes related to color CRUD
router.route('/color').get( getAllColor);
router.route('/colorById/:id').get( getColorById);
router.route('/addColor').post(upload.single('image'), addColor);
router.route('/updateColor/:id').post( updateColor);
router.route('/deleteColor/:id').delete( deleteColor);

// router.route('/deleteCategory/:id').delete(jwtAuthMiddleware, deleteCategory);

// // routes related to size CRUD
// router.route('/size').get(jwtAuthMiddleware, getAllSize);
// router.route('/size').post(jwtAuthMiddleware, getSizes);
// router.route('/sizeById/:id').get(jwtAuthMiddleware, getSizeById);
// router.route('/addSize').post(jwtAuthMiddleware, addSize);
// router.route('/updateSize/:id').post(jwtAuthMiddleware, updateSize);
// router.route('/deleteSize/:id').delete(jwtAuthMiddleware, deleteSize);

// // routes related to color CRUD
// router.route('/color').get(jwtAuthMiddleware, getAllColor);
// router.route('/colorById/:id').get(jwtAuthMiddleware, getColorById);
// router.route('/addColor').post(jwtAuthMiddleware, addColor);
// router.route('/updateColor/:id').post(jwtAuthMiddleware, updateColor);
// router.route('/deleteColor/:id').delete(jwtAuthMiddleware, deleteColor);

// routes related to brand CRUD
router.route('/brand').post( getAllBrand);
router.route('/brandById/:id').get( getBrandById);
router.route('/addbrand').post(upload.single('image'), addBrand);
router.route('/updatebrand/:id').post( updateBrand);
router.route('/deletebrand/:id').delete( deleteBrand);
router.route('/product/add').post(addProduct)

// routes related to 
router.route('/addProduct').post(addProduct);
router.route('/getProducts').get(getAllProduct);
router.route('/getProduct').get(getProductById);
router.route('/updateProduct').post(updateProduct)

// master endpoints
router.route("/getData").get(getData);

module.exports = router; 
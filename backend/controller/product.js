const {productModal}=require("../modals/product.modal");

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

    res.end(JSON.stringify(data));
};

const deleteCategory = async (req,res)=>{
    try{
        const _id= req.params.id;
        const data = await categoryModal.findByIdAndDelete({_id});
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

    }catch(error){
        console.log(error);
    }
}

const updateCategory= async (req,res)=>{
    try{
        const _id= req.params.id;
        
    }catch(error){
        console.log(error);
    }
}

const getCategoryById=async (req,res)=>{
    try{
        console.log("req is ",req);
        const _id = req.params.id;
        const data = await categoryModal.findById({_id});
        if(data){
            res.json({
                status: 200,
                message: "data found",
                data: data
            });
        }
        res.json({
            status: 200,
            message: "data not found",
            data: null
        });
    }catch(error){
console.log(error)
    }
   
}


const addCategory = async (req, res) => {
    const { name } = req.body;
    console.log("it works add category")
    const data = await categoryModal.create({ name });
    if (data) {
        res.json({
            status:204,
            message:"created successfully",
            data:data
        })
    } else {
        res.json({
            status:500,
            message:"failed",
            data:data
        })
    }

}
module.exports = {getAllProduct,getProduct};
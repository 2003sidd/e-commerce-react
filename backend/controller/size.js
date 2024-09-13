const {sizeModal} = require("../modals/size.modal");

const addSize= async (req,resp)=>{

};
const updateSize= async (req,resp)=>{

};
const deleteSize= async (req,resp)=>{
 const _id = req.params.id;
 const data = await sizeModal.findByIdAndDelete({_id},)
};
const getSize= async (req,resp)=>{

    const data = await sizeModal.find();

    if(data){
        req.json({
            data:data,
            message:"data found successfully",
            status:200
        })
    }else{
        req.json({
            data:NULL,
            message:"data Not found",
            status:200
        })
    }

};
const getSizeById= async (req,resp)=>{
 const _id = req.params.id;
 
 if(!id){
    return res.json({
        status: 200,
        message: "id is not present",
        data: null
    });
}

const data = await sizeModal.findById({_id});
if(data){
    res.json({
        status: 200,
        message: "",
        data: null
    });
}else{
    res.json({
        status: 500,
        message: "deleted unsuccessfully",
        data: null
    });
}

};
import React, { useState } from "react";
import api from "../../utilities/apiCall";
import { ToastContainer, toast } from 'react-toastify';
const ColorUpsert = () => {

    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState(null)

    const checkValidation=()=>{
        let isErrorOccured = false;
        const error = {}
        if(!name || name.trim()!==""){
            isErrorOccured = true;
            error.name = "Name is required field"
        }
        if (!image || image === "") {
            error.image = "Image is required";
            isErrorOccured = true;
        }

        setError(error)
        return isErrorOccured;

    }

    async function upsetCategory() {
        if(!checkValidation()){
            const formData = new FormData();
            formData.append("name", name);
    
            // Check if there's an image file to append
            if (image) {
                formData.append("image", image);  // Append the actual file object here
            }
    
            const response = await api.post("addColor", formData)
    
    
            if (response.data && Object.keys(response.data).length !== 0) {
                let data = await response.data;
    
                setName(null)
    
            } else {
                // handle api failure 
                toast.error(response?.message ? response?.message : "Something went wrong!", {
                    position: "top-right"
                });
            }
        }
       
    }


    function takeImage(event) {
        if (!event) {
            return;
        }
        var file = event.target.files[0];


        // Call the function to convert image to Base64
        setImage(file)
        setImagePreview(URL.createObjectURL(file));  // To show image preview
    }



    return (
        <>
            <div className="flex flex-col justify-center items-center bg-gray-200">
                <div className="w-1/2  border-1 border-gray-400 p-4 my-4 rounded-xl bg-white"  >
                <ToastContainer />

                    <h1 className="text-center font-bold text-xl">Color</h1>
                    <div className="mt-2 flex">
                        <label to="category" className="font-semibold">Color name:</label>
                        <input value={name} className="flex-1 ml-[4px] ml-[4px] px-4 border-[1px] border-gray-300 rounded-md focus:border-blue-500 focus:outline-none hover:border-gray-400 transition-colors" htmlFor="categroy" onChange={(e) => setName(e.target.value)} type="text" name="colorName" />
                    </div>
                    {error?.name && <span className="text-red-500 ml-2">{error.name}</span>}
                    <div className="mt-2 flex">
                        <label to="category" >Image</label>
                        <input onChange={(e) => takeImage(e)} text={name} htmlFor="categroy" type="file" name="categoryName" />

                    </div>
                    {error?.image && <span className="text-red-500">{error.image}</span>}

                    {imagePreview && (
                        <img className="flex-1 h-[80px] aspect-h-1 aspect-w-1 " src={imagePreview} alt="Preview" width="100" />
                    )}                    <div className="text-center">
                        <button onClick={upsetCategory} className="py-2 px-4 font-medium border-2 rounded-xl mt-2 text-white center bg-secondary">Add Color</button>
                    </div>
                </div>

            </div>
        </>
    )
};

export default ColorUpsert;
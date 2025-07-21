import React, { useEffect, useState } from "react";
import api from "../../utilities/apiCall";
import { ToastContainer, toast } from 'react-toastify';

const CategoryUpsert = (Props) => {

    const [dataState, setDataState] = useState({
        id: 0,
        name: "",
        image: ""
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        console.log("e", e)
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            setDataState({ ...dataState, image: selectedFile })
            setImagePreview(URL.createObjectURL(selectedFile));  // To show image preview
        }
        console.log("data set", dataState);

    };

    function checkError() {
        const error = {};
        let isErrorOccured = false;
        if (dataState.name === "") {
            error.name = "Name is required";
            isErrorOccured = true;
        }

        if (dataState.image === "") {
            error.name = "Image is required";
            isErrorOccured = true;
        }

        setError(error)
        return isErrorOccured;
    }


    async function upsetCategory() {

        if (!checkError()) {

            const formData = new FormData();
            formData.append("name", dataState.name);
            formData.append("id", dataState.id);

            // Check if there's an image file to append
            if (dataState.image)
                formData.append("image", dataState.image);


            const data = await api.post("/AddCategory", formData)

            if (data?.data) {
                console.log("data", data.data);
                setDataState(null);
            } else {
                toast.error(data?.message ? data?.message : "Something went wrong!", {
                    position: "top-right"
                });
            }


        }
    }



    return (
        <>
            <div className="flex flex-col justify-center items-center bg-gray-200">
                <div className="w-1/2  border-1 border-gray-400 p-4 my-4 rounded-xl bg-white"  >
                    <h1 className="text-center font-bold text-xl">Category</h1>
                    <div className="mt-2">
                        <ToastContainer />
                        <label to="category">Category Name</label>

                        <input className="flex-1 ml-[4px] ml-[4px] px-4 border-[1px] border-gray-300 rounded-md focus:border-blue-500 focus:outline-none hover:border-gray-400 transition-colors" htmlFor="categroy" onChange={(e) => setDataState({ ...dataState, name: e.target.value })} type="text" name="name" />
                    </div>
                    {error?.name && <span className="text-red-500 text-semibold">Category Name is required</span>}

                    <div className="flex mt-4">
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                        {imagePreview && (
                            <img className="flex-1 h-[80px] aspect-h-1 aspect-w-1 " src={imagePreview} alt="Preview" width="100" />
                        )}

                    </div>
                    {error?.image && <span className="text-red-500 text-semibold">Category Image is required</span>}




                    <div className="text-center">
                        <button onClick={upsetCategory} className="py-2 px-4 font-medium border-2 rounded-xl mt-2 text-white center bg-secondary">Add Category</button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default CategoryUpsert;
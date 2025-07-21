import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../utilities/apiCall";
import { ToastContainer, toast } from 'react-toastify';



const BrandUpsert = (Props) => {
    const location = useLocation(); // Access the location object

    const [dataState, setDataState] = useState({
        name: "",
        id: 0,
        image: ""
    });
    const [isSave, setIsSave] = useState(true);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState(null);


    const handleFileChange = (e) => {
        console.log("e", e)
        const selectedFile = e.target.files[0];
        console.log("selected file", selectedFile);

        if (selectedFile) {
            setDataState({ ...dataState, image: selectedFile })
            setImagePreview(URL.createObjectURL(selectedFile));  // To show image preview
        }
        console.log("data set", dataState);

    };


    useEffect(() => {
        getBrand();
    }, [])


    async function getBrand() {
        const queryParams = new URLSearchParams(location.search); // Parse query parameters
        const id = queryParams.get('id');
        if (!id) {
            return
        }

        setIsSave(false);
        const data = await api.get("brandById/" + id);
        if (data?.data) {
            console.log("data", data.data);
            setDataState({ ...dataState, name: data.data.name, id: data.data._id })
            setImagePreview(data.data.image)
        } else {
            toast.error(data?.message ? data?.message : "Something went wrong!", {
                position: "top-right"
            });
        }
    }

    const checkError = () => {
        console.log("fun start")
        const error = {};
        let isErrorOccured = false;
        if (dataState.name === "") {
            error.name = "Name is required";
            isErrorOccured = true;
        }
        if (dataState.image === "") {
            error.image = "Image is required";
            isErrorOccured = true;
        } else {

        }
        console.log("fun end", error)

        setError(error);
        console.log(error)
        return isErrorOccured;
    }

    async function upsertBrand() {
        console.log("main fun")
        if (!checkError()) {
            const formData = new FormData();
            formData.append("name", dataState.name);
            formData.append("id", dataState.id);

            // Check if there's an image file to append
            if (dataState.image) {
                console.log("image presemt");

                formData.append("image", dataState.image);  // Append the actual file object here
            } else {
                console.log("image not presemt");
                console.log("No image file selected");
            }
            console.log("form data", formData)
            if (isSave) {
                const data = await api.post("addBrand", formData);
                if (data?.data) {
                    console.log("data", data.data)
                } else {
                    toast.error(data?.message ? data?.message : "Something went wrong!", {
                        position: "top-right"
                    });
                }
            } else {
                const data = await api.post("addBrand", formData);

                if (data?.data) {
                    console.log("data", data.data)
                } else {
                    toast.error(data?.message ? data?.message : "Something went wrong!", {
                        position: "top-right"
                    });
                }
            }

        }



    }


    return (
        <>
            <div className="flex flex-col justify-center items-center bg-gray-200 ">
                <div className="w-1/2  border-1 border-gray-400 p-4 my-4 rounded-xl bg-white"  >
                    <ToastContainer />

                    <h1 className="text-center font-bold text-xl">Brand</h1>

                    <div className="mt-2 flex">
                        <label className="font-semibold" to="category">Brand Name : </label>
                        <input htmlFor="categroy" className="flex-1 ml-[4px] px-4 border-[1px] border-gray-300 rounded-md focus:border-blue-500 focus:outline-none hover:border-gray-400 transition-colors" value={dataState.name} onChange={(e) => setDataState({ ...dataState, name: e.target.value })} type="text" name="categoryName" />

                    </div>
                    {error?.name && <span className="text-red-500 text-semibold">Name is required</span>}

                    <div className="flex mt-4">
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                        {imagePreview && (
                            <img className="flex-1 h-[80px] aspect-h-1 aspect-w-1 " src={imagePreview} alt="Preview" width="100" />
                        )}

                    </div>
                    {error?.image && <span className="text-red-500 text-semibold">Image is required</span>}

                    <div className="text-center">

                        <button onClick={upsertBrand} className="py-2 px-4 font-medium border-2 rounded-xl mt-2 text-white center bg-secondary">
                            {isSave ? "Add Brand" : "Update Brand"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default BrandUpsert;


// Todos
// 1. Validations and proper api for list and upsert of Size , categroy and color upsert and list
// 2. Pagination api and search, isPagination variable
// 3. Product upsert (List view, upsert) - apis and views on both part customer and admin panel
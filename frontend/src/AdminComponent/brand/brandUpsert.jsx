import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../utilities/apiCall";
const BrandUpsert = (Props) => {


    const [dataState, setDataState] = useState({
        name: "",
        id: 0,
        image: ""
    });


    const [imagePreview, setImagePreview] = useState(null);


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

    const location = useLocation(); // Access the location object

    useEffect(() => {
        getBrand();
    }, [])


    async function getBrand() {
        const queryParams = new URLSearchParams(location.search); // Parse query parameters
        const id = queryParams.get('id')
        if (!id) {
            return
        }
        console.log("query is" + queryParams)
        const data = await api.get("brandById/" + id);
        
        
        if (data?.data) {
            console.log("data", data.data);
            setDataState({ ...dataState, name: data.data.name, id: data.data._id })
            setImagePreview(data.data.image)
        }
    }

    async function upsertBrand() {
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

        const data = await api.post("addBrand", formData);
        if (data?.data) {
            console.log("data", data.data)
        }
        const response = await fetch("http://localhost:8800/route/api/addBrand", {
            method: "POST",
           
            body: formData

        });

        if (response.status) {
            let data = await response.json();
        } else {
            // handle api failure 
        }
    }


    return (
        <>
            <div className="flex flex-col justify-center items-center bg-gray-200 ">
                <div className="w-1/2  border-1 border-gray-400 p-4 my-4 rounded-xl bg-white"  >
                    <h1 className="text-center font-bold text-xl">Brand</h1>

                    <div className="mt-2 flex">
                        <label className="font-semibold" to="category">Brand Name : </label>
                        <input htmlFor="categroy" className="flex-1 ml-[4px] px-4 border-[1px] border-gray-300 rounded-md focus:border-blue-500 focus:outline-none hover:border-gray-400 transition-colors" value={dataState.name} onChange={(e) => setDataState({ ...dataState, name: e.target.value })} type="text" name="categoryName" />





                    </div>
                    <div className="flex mt-4">
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                        {imagePreview && (
                            <img className="flex-1 h-[80px] aspect-h-1 aspect-w-1 " src={imagePreview} alt="Preview" width="100" />
                        )}

                    </div>

                    <div className="text-center">

                        <button onClick={upsertBrand} className="py-2 px-4 font-medium border-2 rounded-xl mt-2 text-white center bg-secondary">Add Brand</button>
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
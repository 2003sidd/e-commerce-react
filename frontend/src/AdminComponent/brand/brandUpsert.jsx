import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../utilities/apiCall";
const BrandUpsert = (Props) => {


    const [dataState, setDataState] = useState({
        name: "",
        id: 0,
    });


    const location = useLocation(); // Access the location object
   
    useEffect(() => {
        getBrand();
    }, [])


    async function getBrand() {
        const queryParams = new URLSearchParams(location.search); // Parse query parameters
        const id = queryParams.get('id')
    
        console.log("query is"+queryParams)
        const data = await api.get("brandById/" + id);
        setDataState({...dataState,name:data.data.name,id:data.data._id})
        if (data?.data) {
console.log("data",data.data)
        }
    }

    async function upsertBrand() {
        console.log("name is", dataState)

        // const bodyData = {
        //     "name": dataState.name,
        //     "id": dataState.id
        // }
        // const response = await fetch("http://localhost:8800/route/api/addBrand", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json" // Set this header
        //     },
        //     body: JSON.stringify(bodyData)

        // });

        // if (response.status) {
        //     let data = await response.json();
        // } else {
        //     // handle api failure 
        // }
    }


    return (
        <>
            <div className="flex flex-col justify-center items-center bg-gray-200 ">
                <div className="w-1/2  border-1 border-gray-400 p-4 my-4 rounded-xl bg-white"  >
                    <h1 className="text-center font-bold text-xl">Brand</h1>

                    <div className="mt-2">
                        <label to="category">Brand Name</label>
                        
                        <input htmlFor="categroy"  value={dataState.name}  onChange={(e) => setName(e.target.value)} type="text" name="categoryName" />
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
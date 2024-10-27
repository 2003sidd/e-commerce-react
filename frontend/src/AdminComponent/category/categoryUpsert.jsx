import React, { useEffect, useState } from "react";
const CategoryUpsert = (Props) => {

    const [name, setName] = useState("sidd");


    async function upsetCategory() {
        console.log("name is", name)
        const bodyData = {
            "name": name,
        }
        const response = await fetch("http://localhost:8800/route/api/AddCategory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" // Set this header
            },
            body: JSON.stringify(bodyData)

        });

        if (response.status) {
            let data = await response.json();
            // if(data.status){
                setName("");
            // }
        } else {
            // handle api failure 
        }
    }



    return (
        <>
            <div className="flex flex-col justify-center items-center bg-gray-200">
                <div className="w-1/2  border-1 border-gray-400 p-4 my-4 rounded-xl bg-white"  >
                    <h1 className="text-center font-bold text-xl">Category</h1>
                    <div className="mt-2">
                        <label to="category">Category Name</label>
                        <input className="mt-2" value={name}  htmlFor="categroy" onChange={(e) => setName(e.target.value)} type="text" name="categoryName" />
                    </div>
                   
                    <div className="text-center">
                        <button onClick={upsetCategory} className="py-2 px-4 font-medium border-2 rounded-xl mt-2 text-white center bg-secondary">Add Category</button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default CategoryUpsert;
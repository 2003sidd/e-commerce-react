import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const CategoryList = () => {

    const [data, setData] = useState("");
    const [show, chngeShowe] = useState(true);

    async function deleteItem(id){
        const response = await fetch("http://localhost:8800/route/api/deleteCategory/"+id,{
            method:"Delete"
        });
        if (response.ok) {

            let res = await response.json()
            console.log("response is", res)
            // setData(data.res)
            chngeShowe(false);


        }
    }
    async function editItem(id){}

    async function fetchData() {
        try {
            const response = await fetch("http://localhost:8800/route/api/category");

            if (response.ok) {

                let data = await response.json()
                console.log("response is", data)
                setData(data.data)
                chngeShowe(false);


            }

        } catch (error) {
            console.log("error is", error);
        }

    }

    useEffect(() => {
        fetchData();
    }, [])
    const row = [
        { id: 1, name: "dev", age: 20 },
        { id: 2, name: "dev1", age: 21 },
        { id: 3, name: "dev2", age: 22 }
    ]
    if (show) {
        <h1 className="text-center text-2xl font-bold">No Data FOund</h1>

    } else {

        return (
            <>
                <div className="">
                    <div className="flex flex-row">
                        <div className="w-1/2 py-2 flex pl-4">
                           <span>Search: </span> <input className="ml-4  text-centers" placeholder="search" type="text" name="string" />
                        </div>
                        <div className=" w-1/2 text-end">
                            <button className="py-2 px-6 text-white font-bold border-2 rounded-xl bg-blue-600 mr-6"><Link to="addItem">Add + </Link></button>
                        </div>
                    </div>



                    <table className="border-2 p-y-6 rounded-2xl m-4 border-gray-500" style={{ width: "98%" }}>
                        <thead>
                            <tr>
                                <th className="w-1/5 ">S no.</th>
                                <th className="w-1/5">Name</th>
                                <th className="w-1/5">Image</th>
                                <th className="w-1/5" >Edit</th>
                                <th className="w-1/5">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(row => (
                                <tr key={row._id} className="my-2 t-b-2" >
                                    <td className="w-1/5 p-2 text-center">{row._id}</td>
                                    <td className="w-1/5 p-2 text-center">{row.name}</td>
                                    <td className="w-1/5 p-2 text-center">{row.age}</td>
                                    <td onClick={(e)=>{editItem(row._id)}} className="w-1/5 p-2 text-center">Edit</td>
                                    <td onClick={(e)=>{deleteItem(row._id)}} className="w-1/5 p-2 text-center">Delete</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>

                </div>
            </>
        )
    }

};
export default CategoryList;
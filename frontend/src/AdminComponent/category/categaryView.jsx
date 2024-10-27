import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const CategoryList = () => {

    const [data, setData] = useState("");
    const [show, chngeShowe] = useState(true);

    async function deleteItem(id) {
        const response = await fetch("http://localhost:8800/route/api/deleteCategory/" + id, {
            method: "Delete"
        });
        if (response.ok) {
            let res = await response.json()
            console.log("response is", res)
            // setData(data.res)
            chngeShowe(false);
        }
    }
    async function editItem(id) { }

    async function fetchData() {
        try {
            const response = await fetch("http://localhost:8800/route/api/category");

            if (response.ok) {
                let data = await response.json();
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
   
    if (show) {
        <h1 className="text-center text-2xl font-bold">No Data FOund</h1>

    } else {

        return (
            <>
                <div className="bg-gray-100 p-6">
                    <div className="p-4 bg-white">
                        <div className="py-4  text-xl bold">Category</div>

                        <div className="flex flex-row  bg-white">
                            <div className="w-1/2 items-center flex ">
                                <span>Search: </span> <input className="ml-4 px-1 text-centers" placeholder="search" type="text" name="string" />
                            </div>
                            <div className=" w-1/2 text-end">
                                <button className="py-2 px-6 text-white font-bold border-1 border-gray-400 rounded-xl bg-blue-600 "><Link to="/admin/categoryupsert" className="text-center">Add + </Link></button>
                            </div>
                        </div>
                        <table className="border-2 p-y-6 rounded-2xl my-4 border-gray-400" >
                        <thead className="border-2 border-gray-400 bg-gray-200">
                                <tr>
                                    <th className="w-1/5 ">S no.</th>
                                    <th className="w-1/5">Name</th>
                                    <th className="w-1/5" >Edit</th>
                                    <th className="w-1/5">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(row => (
                                    <tr key={row._id} className="my-2 t-b-2" >
                                        <td className="w-1/5 p-2 text-center">{row._id}</td>
                                        <td className="w-1/5 p-2 text-center">{row.name}</td>
                                        <td onClick={(e) => { editItem(row._id) }} className="w-1/5 p-2 text-center">Edit</td>
                                        <td onClick={(e) => { deleteItem(row._id) }} className="w-1/5 p-2 text-center">Delete</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>

                    </div>
                </div>
            </>
        )
    }

};
export default CategoryList;
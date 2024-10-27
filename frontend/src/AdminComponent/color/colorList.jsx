import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const ColorList = () => {

    const [dataState, setDataState] = useState({
        data: [],    // Array to store data
        status: 0,   // Number to indicate status
        message: '',  // String for messages
    });

    async function deleteItem(id) {
        const response = await fetch("http://localhost:8800/route/api/deleteColor/" + id, {
            method: "Delete"
        });
        if (response.ok) {

            let res = await response.json()
            if (res.status) {

            }



        }
    }
    async function editItem(id) { }

    async function fetchData() {
        try {
            const response = await fetch("http://localhost:8800/route/api/color");

            if (response.ok) {

                let data = await response.json();
                console.log("response is", data);
                setDataState({
                    data: data.data || [], // Ensure you handle the structure correctly
                    status: data.status || 0,
                    message: data.message || '',
                });


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

    return (
        <>

            <div className="bg-gray-100 p-6">

                <div className=" bg-white p-4">
                    <div className=" text-2xl bold">Colour</div>

                    <div className="flex flex-row  bg-white">
                        <div className="w-1/2 items-center flex ">
                            <span>Search: </span> <input className="ml-4 px-1 text-centers" placeholder="search" type="text" name="string" />
                        </div>
                        <div className=" w-1/2 text-end">
                            <button className="py-2 px-6 text-white font-bold border-2 rounded-xl bg-blue-600 "><Link to="/admin/colorupsert">Add + </Link></button>
                        </div>
                    </div>


                    <table className="border-2 p-y-6 rounded-2xl my-4 border-gray-400" >
                        <thead className="border-2 border-gray-400 bg-gray-200">
                            <tr>
                                <th className="w-1/5 ">S no.</th>
                                <th className="w-1/5">Name</th>
                                <th className="w-1/5">Image</th>
                                <th className="w-1/5" >Edit</th>
                                <th className="w-1/5">Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            {Array.isArray(dataState.data) && dataState.data.length > 0 ? (
                                dataState.data.map(row => (
                                    <tr key={row._id} className="my-2 t-b-2">
                                        <td className="w-1/5 p-2 text-center">{row._id}</td>
                                        <td className="w-1/5 p-2 text-center">{row.name}</td>
                                        <td className="w-1/5 p-2 text-center">{row.image}</td>
                                        <td onClick={(e) => { editItem(row._id) }} className="w-1/5 p-2 text-center">Edit</td>
                                        <td onClick={(e) => { deleteItem(row._id) }} className="w-1/5 p-2 text-center">Delete</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center p-2"><h1>No data available</h1></td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
            </div>
        </>
    )

};
export default ColorList;
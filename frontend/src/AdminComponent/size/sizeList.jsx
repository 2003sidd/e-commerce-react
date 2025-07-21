import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utilities/apiCall";
import { ToastContainer, toast } from 'react-toastify';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const SizeList = () => {
    const navigation = useNavigate();
    const [dataState, setDataState] = useState({
        data: [],    // Array to store data
        status: 0,   // Number to indicate status
        message: '',  // String for messages
    });

    useEffect(() => {
        fetchData();
    }, [])


    async function deleteItem(id) {
        const response = await api.delete("deleteSize" + id);
        if (response?.data) {
            toast.success(data?.message, {
                position: "top-right"
            });
        } else {
            toast.error(data?.message ? data?.message : "Something went wrong!", {
                position: "top-right"
            });
        }
    }
    async function editItem(id) {
        const queryParams = new URLSearchParams({
            id: id,
        });
        navigation(`../sizeupsert?${queryParams.toString()}`);

    }

    async function fetchData() {
        try {
            const response = await api.get("size");

            if (response?.data) {

                // let data = await response.json()
                console.log("response is", response);
                setDataState({
                    data: response.data || {}, // Ensure you handle the structure correctly
                    status: response.status || 0,
                    message: response.message || '',
                });
                // chngeShowe(false);
            } else {
                toast.error(response?.message ? response?.message : "Something went wrong!", {
                    position: "top-right"
                });
            }

        } catch (error) {
            console.log("error is", error);
        }

    }





    return (
        <>
            <div className=" p-6" style={{ backgroundColor: "var(--background-color)" }}>

                <div className="p-4 rounded-2xl bg-white">
                    <div className="py-4 text-2xl bold">Size</div>
                    <ToastContainer />


                    <div className="flex flex-row  bg-white">
                        <div className="w-1/2 items-center flex ">
                            <span>Search: </span> <input className="ml-4 px-1 text-centers py-1 px-2 rounded-lg focus:outline-none" style={{ background: "var(--background-color)" }} placeholder="search" type="text" name="string" />
                        </div>
                        <div className=" w-1/2 text-end">
                            <button className="py-2 px-6 text-white font-medium border-2 rounded-xl" style={{ backgroundColor: "var(--primary-color)" }}><Link to="/admin/sizeupsert">Add + </Link></button>
                        </div>
                    </div>


                    <table className="border-2 p-y-6 rounded-2xl  my-4 border-gray-400 w-1" style={{ width: "100%" }}>
                        <thead className="border-2 border-gray-400 bg-gray-200">
                            <tr>
                                <th className="w-1/5 ">S no.</th>
                                <th className="w-1/5">Name</th>
                                <th className="w-1/5" >Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(dataState.data) && dataState.data.length > 0 ? (
                                dataState.data.map((row, index) => (
                                    <tr key={row._id} className="my-2 t-b-2">
                                        <td className="w-1/5 p-2 text-center">{index + 1}</td>
                                        <td className="w-1/5 p-2 text-center">{row.size}</td>

                                        <td className="w-1/5 p-2 text-center">
                                            <FontAwesomeIcon onClick={() => editItem(row._id)} icon={faEdit} />
                                            <FontAwesomeIcon className="ml-8" onClick={() => deleteItem(row._id)} icon={faTrash} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center p-2 w-1"><h1>No data available</h1></td>
                                </tr>
                            )}

                        </tbody>
                    </table>

                </div>
            </div>

        </>
    )


};
export default SizeList;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import api from "../../utilities/apiCall";
import Modal from "../../SharedComponent/Model/AlertModel";
const UserList = () => {
    let id;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataState, setDataState] = useState({
        data: [],    // Array to store data
        status: 0,   // Number to indicate status
        message: '',  // String for messages
    });


    async function deleteItem(userId) {
        id = userId;
        console.log("open")
      

        const response = await api.delete("/deleteCategoyr");
        if (response.ok) {
            let res = await response.json()
            console.log("response is", res)
            fetchData();
            // setData(data.res)
            // setDataState()
        }
    }
    async function editItem(id) { }

    function onPopUpCancel() {
        setIsModalOpen(false)
    }
    function onPopUpOk() {
        deleteItem(id)
        setIsModalOpen(false)

    }

    function openPopUp(userId){
        id = userId;
        setIsModalOpen(true);

    }

    async function fetchData() {
        try {
            const response = await api.post("getUsers");
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

    useEffect(() => {
        fetchData();
    }, [])




    return (
        <>
            <div className=" p-6" style={{ backgroundColor: "var(--background-color)" }}>

                <div className="p-4 rounded-2xl bg-white">

                    <div className="py-4 text-2xl bold">Users</div>
                    {isModalOpen && <Modal title={"Delete Confirmatiion"} body={"Are you sure want to delete user!!"} onCancel={onPopUpCancel} onDelete={onPopUpOk} />}

                    <div className="flex flex-row  bg-white">
                        <div className="w-1/2 items-center flex ">
                            <span>Search: </span> <input className="ml-4 px-1 text-centers py-1 px-2 rounded-lg focus:outline-none" style={{ background: "var(--background-color)" }} placeholder="search" type="text" name="string" />
                        </div>
                        <div className=" w-1/2 text-end">
                            <button className="py-2 px-6 text-white font-medium border-1 border-gray-400 rounded-xl  " style={{ backgroundColor: "var(--primary-color)" }}><Link to="/admin/categoryupsert" className="text-center">Add + </Link></button>
                        </div>
                    </div>
                    <table className="border-2 p-y-6 rounded-2xl my-4 border-gray-400 w-full" >
                        <thead className="border-2 border-gray-400 bg-gray-200">
                            <tr>
                                <th className="w-1/5 ">S no.</th>
                                <th className="w-1/5">Name</th>
                                <th className="w-1/5">Number</th>
                                <th className="w-1/5">Email</th>

                                <th className="w-1/5" >Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(dataState.data.data) && dataState.data.count > 0 ? (
                                dataState.data.data.map((row, index) => (
                                    <tr key={row._id} className="my-2 t-b-2">
                                        <td className="w-1/5 p-2 text-center">{index + 1}</td>
                                        <td className="w-1/5 p-2 text-center">{row.name}</td>
                                        <td className="w-1/5 p-2 text-center">{row.number}</td>
                                        <td className="w-1/5 p-2 text-center">{row.email}</td>
                                        <td className="w-1/5 p-2 text-center">
                                            <FontAwesomeIcon onClick={() => editItem(row._id)} icon={faEdit} />
                                            <FontAwesomeIcon className="ml-8" onClick={() => openPopUp(row._id)} icon={faTrash} />
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
export default UserList;
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

import api from "../../utilities/apiCall";
import { useLocation } from "react-router-dom";
const SizeUpsert = (Props) => {
    const location = useLocation();

    const [name, setName] = useState("");
    const [isUpdate, setIsUpdate] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        getSize();
    }, []);

    const validate = () => {
        const error = {};
        let isErrorOccured = false;
        if (!name || name.trim() === "") {
            error.emptyName = "Name is required field"
            isErrorOccured = true;
        } else {
            console.log("name length", name.trim().length)
            if (name.trim().length < 3) {
                error.size = "Name length should be greater than or equal to 3"
                isErrorOccured = true;
            }
        }

        setError(error);
        return isErrorOccured;
    }

    async function getSize() {
        const queryParams = new URLSearchParams(location.search); // Parse query parameters
        const id = queryParams.get('id');
        if (!id) {
            return;
        }
        setIsUpdate(true);
        const data = await api.get("sizeById/" + id);
        if (data?.data) {
            console.log("data", data.data.size)
            setName(data.data.size);
            console.log("after", data.data.size)
        } else {
            toast.error(data?.message ? data?.message : "Something went wrong!", {
                position: "top-right"
            });
        }
    }

    async function upsertSize() {
        if (!validate()) {
            setName(name.trim());
            const response = await api.post("addSize", { name });
            if (response?.data) {
                setName(null);
                toast.success(data?.message, {
                    position: "top-right"
                });
            } else {
                toast.error(data?.message ? data?.message : "Something went wrong!", {
                    position: "top-right"
                });
            }
        }

    }


    return (
        <>
            <div className="flex flex-col justify-center items-center bg-gray-200 ">
                <div className="w-1/2  border-1 border-gray-400 p-4 my-4 rounded-xl bg-white"  >
                    <ToastContainer />

                    <h1 className="text-center font-bold text-xl">Size</h1>
                    <div className="mt-2 flex">
                        <label to="category" className="font-semibold">Size Name:</label>
                        <input htmlFor="categroy" className="flex-1  ml-[6px] px-4 border-[1px] border-gray-300 rounded-md focus:border-blue-500 focus:outline-none hover:border-gray-400 transition-colors" onChange={(e) => setName(e.target.value)} value={name} type="text" name="categoryName" />

                    </div>
                    {error?.emptyName && <span className="text-red-500 font-semibold">{error.emptyName}</span>}
                    {error?.size && <span className="text-red-500 font-semibold">{error.size}</span>}


                    <div className="text-center">
                        <button onClick={upsertSize} className="py-2 px-4 font-medium border-2 rounded-xl mt-2 text-white center bg-secondary">{isUpdate ? "Update Size" : "Add Size"}</button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default SizeUpsert;


// Todos
// 1. Validations and proper api for list and upsert of Size , categroy and color upsert and list
// 2. Pagination api and search, isPagination variable
// 3. Product upsert (List view, upsert) - apis and views on both part customer and admin panel
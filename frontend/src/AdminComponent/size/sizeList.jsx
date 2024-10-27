import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const SizeList = () => {

    const [dataState, setDataState] = useState({
        data: [],    // Array to store data
        status: 0,   // Number to indicate status
        message: '',  // String for messages
    });

    async function deleteItem(id) {
        const response = await fetch("http://localhost:8800/route/api/deleteSize/" + id, {
            method: "Delete"
        });
        if (response.ok) {

            let res = await response.json()
            console.log("response is", res)
            // setData(data.res)
            // chngeShowe(false);


        }
    }
    async function editItem(id) { }

    async function fetchData() {
        try {
            const response = await fetch("http://localhost:8800/route/api/size");

            if (response.ok) {

                let data = await response.json()
                console.log("response is", data);
                setDataState({
                    data: data.data || [], // Ensure you handle the structure correctly
                    status: data.status || 0,
                    message: data.message || '',
                });
                // chngeShowe(false);
            }

        } catch (error) {
            console.log("error is", error);
        }

    }
    function test(e){
        console.log("value is",e)
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div onClick={(e)=>{test(e)}}>HElloe </div>
    )
 
        // return (
        //     <>
        //         <div className="bg-gray-100 p-6">

        //             <div className="p-4 bg-white">
        //                 <div className="py-4 text-xl bold">Size</div>

        //                 <div className="flex flex-row  bg-white">
        //                     <div className="w-1/2 items-center flex ">
        //                         <span>Search: </span> <input className=" px-1 text-centers" placeholder="search" type="text" name="string" />
        //                     </div>
        //                     <div className=" w-1/2 text-end">
        //                         <button className="py-2 px-6 text-white font-bold border-2 rounded-xl bg-blue-600 "><Link to="/admin/sizeupsert">Add + </Link></button>
        //                     </div>
        //                 </div>


        //                 <table className="border-2 p-y-6 rounded-2xl  my-4 border-gray-400 w-1" style={{width:"100%"}}>
        //                     <thead className="border-2 border-gray-400 bg-gray-200">
        //                         <tr>
        //                             <th className="w-1/5 ">S no.</th>
        //                             <th className="w-1/5">Name</th>
        //                             <th className="w-1/5" >Edit</th>
        //                             <th className="w-1/5">Delete</th>
        //                         </tr>
        //                     </thead>
        //                     <tbody>
        //                         {Array.isArray(dataState.data) && dataState.data.length > 0 ? (
        //                             dataState.data.map(row => (
        //                                 <tr key={row._id} className="my-2 t-b-2">
        //                                     <td className="w-1/5 p-2 text-center">{row._id}</td>
        //                                     <td className="w-1/5 p-2 text-center">{row.name}</td>
        //                                     <td onClick={() => editItem(row._id)} className="w-1/5 p-2 text-center">Edit</td>
        //                                     <td onClick={() => deleteItem(row._id)} className="w-1/5 p-2 text-center">Delete</td>
        //                                 </tr>
        //                             ))
        //                         ) : (
        //                             <tr>
        //                                 <td colSpan={4} className="text-center p-2 w-1"><h1>No data available</h1></td>
        //                             </tr>
        //                         )}

        //                     </tbody>
        //                 </table>

        //             </div>
        //         </div>

        //     </>
        // )
    

};
export default SizeList;
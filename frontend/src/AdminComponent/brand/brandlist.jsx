import React, { useEffect, useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import api from "../../utilities/apiCall";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faShoppingCart, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
const BrandList = () => {
    const navigation = useNavigate();

    const [dataState, setDataState] = useState({
        data: [],    // Array to store data
        status: 0,   // Number to indicate status
        message: '',  // String for messages
    });
 const [currentIndex,setIndex]=useState(1);
    async function deleteItem(id) {
        try{
            console.log(" value is"+id)
            const data = await api.delete(`deletebrand/`+id);
            if(data?.data){
                fetchData()
            }
            console.log('Data fetched:', data);
        } catch (error) {
          console.error('Error fetching data:', error);
      
        }

    }
    async function editItem(id) {
        const queryParams = new URLSearchParams({
            id: id,
          });
        navigation(`../addBrand?${queryParams.toString()}`);

     }

    async function fetchData() {

        try{
            const payload = {
                index:currentIndex,
                top:5
            }
            const data = await api.post(`brand`,payload)
            console.log('Data fetched:', data);
            setDataState({
                data: data.data.data || [], // Ensure you handle the structure correctly
                status: data.status || 0,
                message: data.message || '',
            });
        } catch (error) {
          console.error('Error fetching data:', error);
        }

    }

    useEffect(() => {
        fetchData();
    }, [])


    return (
        <>
            <div className=" p-6" style={{ backgroundColor: "var(--background-color)" }}>

                <div className="p-4 rounded-2xl bg-white">
                    <div className="py-4 text-2xl bold">Brand</div>


                    <div className="flex flex-row  bg-white">
                        <div className="w-1/2 items-center flex ">
                            <span>Search: </span> <input className="ml-4 px-1 text-centers py-1 px-2 rounded-lg focus:outline-none" style={{ background: "var(--background-color)" }} placeholder="search" type="text" name="string" />
                        </div>
                        <div className=" w-1/2 text-end">
                            <button className="py-2 px-6 text-white font-medium border-2 rounded-xl  " style={{backgroundColor:"var(--primary-color)"}}><Link to="/admin/addBrand">Add + </Link></button>
                        </div>
                    </div>


                    <table className="border-2 p-y-6 rounded-2xl  my-4 border-gray-400 w-1" style={{ width: "100%" }}>
                        <thead className="border-2 border-gray-400 bg-gray-200">
                            <tr>
                                <th className="w-1/5 ">S no.</th>
                                <th className="w-1/5">Name</th>
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
                                        <td onClick={() => editItem(row._id)} className="w-1/5 p-2 text-center">
                                        <FontAwesomeIcon icon={faEdit} />
                                            
                                        </td>
                                        <td onClick={() => deleteItem(row._id)} className="w-1/5 p-2 text-center">  

                                             <FontAwesomeIcon icon={faTrash} />
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
export default BrandList;
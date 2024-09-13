import React, { useEffect, useState } from "react"
 const ColorList = () =>{

    const [data,setData]=useState("");
    const [show,chngeShowe]=useState(true);

    async function fetchData(){
        try {
            const response =await fetch("http://localhost:8800/route/api/color");

            if(response.ok){
               
                let data =  await response.json()
                console.log("response is", data)
                setData(data.data)
                chngeShowe(false);
              
    
            }

        } catch (error) {
            console.log("error is",error);
        }
  
    }

    useEffect(()=>{
        fetchData();
    },[])
    const row =[
        {id:1,name:"dev",age:20},
        {id:2,name:"dev1",age:21},
        {id:3,name:"dev2",age:22}
    ]
    if(show){
        <div>
            <h1 className="text-center text-2xl font-bold">No Data FOund</h1>
        </div>
    }else{

    return  (
        <>
        <div className="">
    
            <table className="border-2 p-y-6 rounded-2xl m-4 border-gray-500" style={{width:"98%"}}>
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
                    {data.map(row =>(
                        <tr key={row.id} className="my-2 t-b-2" >
                        <td className="w-1/5 p-2 text-center">{row.id}</td>
                        <td className="w-1/5 p-2 text-center">{row.name}</td>
                        <td className="w-1/5 p-2 text-center">{row.age}</td>
                        <td className="w-1/5 p-2 text-center">Edit</td>
                        <td className="w-1/5 p-2 text-center">Delete</td>
                    </tr>
                    ))}
                    
                </tbody>
            </table>
     
        </div>
        </>
    )
}

    };
 export default ColorList;
import React, { useState } from "react";
const ColorUpsert = () => {

    const [name, setName] = useState("sidd");
    const [image, setImage] = useState(null);

    async function upsetCategory() {
        console.log("name is", name)

        const bodyData = {
            "name": name,
            "image":image
        }
        const response = await fetch("http://localhost:8800/route/api/addColor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" // Set this header
            },
            body: JSON.stringify(bodyData)

        });

        if (response.status) {
            let data = await response.json();
            if(data.status){
                setName(null)
            }
        } else {
            // handle api failure 
        }
    }


    function takeImage(event) {
        if (!event) {
            return;
        }
        var file = event.target.files[0];
        

        // Call the function to convert image to Base64
        imageToBase64(file, function (base64Str) {
            setImage(base64Str);

        });
    }


    // Function to convert image to Base64
    function imageToBase64(file, callback) {
        // Create a FileReader object
        var reader = new FileReader();

        // Set the onload function of FileReader
        reader.onload = function (e) {
            // Get the Base64 string
            var base64Str = e.target.result;
            // Execute the callback function with the Base64 string as argument
            callback(base64Str);
        }

        // Read the image file as a data URL
        reader.readAsDataURL(file);
    }


    return (
        <>
            <div className="flex flex-col justify-center items-center bg-gray-200">
                <div className="w-1/2  border-1 border-gray-400 p-4 my-4 rounded-xl bg-white"  >
                    <h1 className="text-center font-bold text-xl">Color</h1>
                    <div className="mt-2">
                        <label to="category">Color name</label>
                        <input className="mt-2" htmlFor="categroy" onChange={(e) => setName(e.target.value)} type="text" name="categoryName" />
                    </div>
                    <div className="mt-2">
                            <label to="category" >Image</label>
                            <input onChange={(e) => takeImage(e)} htmlFor="categroy" type="file" name="categoryName" />
                        </div>

                    <div className="text-center">
                        <button onClick={upsetCategory} className="py-2 px-4 font-medium border-2 rounded-xl mt-2 text-white center bg-secondary">Add Color</button>
                    </div>
                </div>

            </div>
        </>
    )
};

export default ColorUpsert;
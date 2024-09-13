import React, { useEffect, useState } from "react";
const CategoryUpsert = (Props) => {

    const [btnText, setBtnText] = useState("Add Size");
    const [heading, setHeading] = useState("Size");
    const [name, setName] = useState("sidd");
    const [image, setImage] = useState("");

    async function addProduct(){
        console.log("name is",name)
        
        const bodyData ={
            "name":name,
            "image":image
        }
      const response = await fetch("http://localhost:8800/route/api/AddCategory",{
        method:"POST",
        headers: {
            "Content-Type": "application/json" // Set this header
        },       
        body: JSON.stringify(bodyData)

      });

      if(response.status){
        let data =await response.json();
        console.log("response",data)
      }else{
        // handle api failure 
      }
    }


    function takeImage(event){
        console.log("value is",event);
    var file = event.target.files[0];
    if (!event) {
        return;
    }

    console.log("file is",file);
    // Call the function to convert image to Base64
    imageToBase64(file, function (base64Str) {
        console.log('Base64 representation of the image:');

        setImage(base64Str);
        console.log("image is",image)
        
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



    function upSertItem() {
        console.log("function calls")
        console.log(Props.text)

        addProduct();


        // switch (Props.text) {
        //     case "category":
        //         break;
        //     case "color":

        //         break;

        //     default:
        //         break;
        // }
    }
    useEffect(() => {
        switch (Props.comp) {
            case "category":
                if (!Props.isEdit) {
                    setBtnText("Add Category");
                    setHeading("Add Category");
                } else {
                    getCategoryById();
                    setBtnText("Edit Category");
                    setHeading("Edit Category");
                }
                break;
            case "color":
                if (!Props.isEdit) {
                    setBtnText("Add Colour");
                    setHeading("Add Colour")
                } else {
                    setBtnText("Edit Colour");
                    setHeading("Edit Colour")
                }

                break;
            default:
                if (!Props.isEdit) {
                    setBtnText("Add Size");
                    setHeading("Add Size");
                } else {
                    setBtnText("Edit Size");
                    setHeading("Edit Size");
                }

                break;
        }
    }, [Props.comp]); // Depend on Props.text so it runs when Props.text changes


    function call() {
        console.log("Method call")
    }
    return (
        <>
            <div className="flex flex-col justify-center items-center bg-gray-200">
                <div className="w-1/2  border-1 border-gray-400 p-4 my-4 rounded-xl bg-white"  >
                    <h1 className="text-center font-bold text-xl">{heading}</h1>
                    <div className="mt-2">
                        <label to="category">Name</label>
                        <input htmlFor="categroy" onChange={(e) => setName(e.target.value)} type="text" name="categoryName" />
                    </div>
                    {Props.comp != "size" &&
                        <div className="mt-2">
                            <label to="category" >Image</label>
                            <input onChange={(e) => takeImage(e)} htmlFor="categroy" type="file" name="categoryName" />
                        </div>
                    }

                    <div className="text-center">
                        <button onClick={upSertItem} className="py-2 px-4 font-medium border-2 rounded-xl mt-2 text-white center bg-secondary">{btnText}</button>

                    </div>
                </div>

            </div>
        </>
    )
};

export default CategoryUpsert;
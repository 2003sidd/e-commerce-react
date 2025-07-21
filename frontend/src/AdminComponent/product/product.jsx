import React, { useEffect, useState } from "react";
import api from "../../utilities/apiCall";
import "./product.css";

const ProductUpsert = () => {
    const [productData, setProductData] = React.useState({
        name: "",
        category: "",
        gender: "",
        descripation: "",
        varient: [{
            images: "",
            price: 0,
            stock: 0,
            color: "",
            size: []
        }]
    })

    const [dataList,setDataList] = useState({
        category:[]
    })

    useEffect(() => {
        fetchData();
    }, []);


    async function fetchData() {
        try {
            const data = await api.get(`getData`)
            console.log('Data fetched:', data);
            setDataList(data.data)

        } catch (error) {
            console.log("Error", error);
        }
    }

    function updateVarientArray() {

        let varient = [...productData.varient];
        varient.push({
            images: [],
            price: 0,
            stock: 0,
            color: "",
            size: []
        })
        setProductData({ ...productData, varient: varient });
    }

    function upsertVarient(event, index) {
        const { name, value } = event.target;

        const updatedVarient = [...productData.varient];
        updatedVarient[index] = {
            ...updatedVarient[index],
            [name]: value
        };

        setProductData({ ...productData, varient: updatedVarient });
        console.log(name + " and " + index)

    }

    function upsertSize(event, index) {
        const { name, value } = event.target;

        const updateSize = [...productData.varient[index].size];
        updateSize.push(value);


        const updatedVarient = [...productData.varient];
        updatedVarient[index].size = updateSize;
        setProductData({ ...productData, varient: updatedVarient });
        console.log(name + " and " + index)

    }

    const handleImage = (event, variantIndex) => {
        const updatedVarient = [...productData.varient];
        updatedVarient[variantIndex].images = Array.from(event.target.files);
        setProductData({ ...productData, varient: updatedVarient });
    };

    const addProduct = async () => {
        // Deep copy productData and convert numeric strings to numbers
        const sanitizedProduct = {
            ...productData,
            varient: productData.varient.map(variant => ({
                ...variant,
                price: Number(variant.price),
                stock: Number(variant.stock),
                size: variant.size.map(s => Number(s)) // optional: if size should be numeric
            }))
        };

        console.log("Sending to backend:", sanitizedProduct);
        const data = await api.post("/addProduct", sanitizedProduct);
    };

    function handleChange(event) {
        const { name, value } = event.target;
        setProductData({
            ...productData,
            [name]: value
        })
        console.log(productData)
    }
    function selectCateory(event) {
        console.log(event)

 console.log(event.target.value)


      setProductData({
            ...productData,
            category: event.target.value
        });
    }

    function changeColor(event) {
        // setProductData({...productData,gender:event.target.value});
        setProductData({
            ...productData,
            gender: event.target.value
        });
        console.log("value is", productData)

    }
    function removeIndex(index) {
        let varientArray = productData.varient.filter((_, i) => i !== index);

        setProductData(prevProductData => {
            // You might want to update just a part of productData (e.g., if you want to replace the varient)
            return {
                ...prevProductData,       // retain the previous state
                varient: varientArray          // replace varient with the filtered product
            };
        });
    }
    function ceck(){
        console.log(dataList)
    }

    return (
        <>

            <div className="w-full px-4 py-4 flex">
                Name<span className="text-red-500">*</span>
                <input onChange={handleChange} className="input" type="text" name="name" placeholder="Name" />
            </div>
            <div className="flex">
                <div className="w-1/2  px-4 flex">
                    <label onClick={ceck}>Select Category:</label>
                    <select value={productData.category} onChange={selectCateory}>
                        <option value="">-- Select --</option>
                        {Array.isArray(dataList.category) && dataList.category.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="w-1/2  px-4 flex">Category<span className="text-red-500">*</span>
                    <input onChange={handleChange} className="input" type="text" name="category" placeholder="Category" />
                </div>
                <div className="w-1/2  px-4 flex">For<span className="text-red-500">*</span>
                    <select className="ml-2" value={productData.gender} onChange={changeColor}>
                        <option value="">Select a gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Unisex">Unisex</option>
                    </select>

                </div>
            </div>
            <div className="w-full p-4 flex">

                Descripation<span className="text-red-500">*</span>
                <input onChange={handleChange} type="text" name="descripation" placeholder="Descripation" className="h-20 input" />

            </div>

            <div className="flex items-center">
                <h2 className="mx-4 text-xl font-bold">Varients</h2>
                <hr className="flex-1" />
            </div>

            {productData.varient.map((user, index) => (
                <div key={index}>
                    {index != 0 && <hr />}
                    <div className="w-full px-4 py-4 flex">
                        Images
                        <span className="text-red-500">*</span>
                        <input onChange={(event) => handleImage(event, index)} type="file" name="images" className="ml-2" />
                        {index != 0 &&
                            <div className="text-end flex-grow" >
                                <button onClick={() => removeIndex(index)} className="button text-white font-semibold">Remove -</button>
                            </div>
                        }

                    </div>

                    <div className="flex">
                        <div className="w-1/2  px-4 flex">Price<span className="text-red-500">*</span>
                            <input onChange={(event) => upsertVarient(event, index)} className="input" type="text" name="price" placeholder="Price" />
                        </div>
                        <div className="w-1/2  px-4 flex">Stock<span className="text-red-500">*</span>
                            <input onChange={(event) => upsertVarient(event, index)} className="input" type="text" name="stock" placeholder="Stock" />
                        </div>
                    </div>
                    <div className="flex py-4">
                        <div className="w-1/2  px-4 flex">Size<span className="text-red-500">*</span>
                            <input onChange={(event) => upsertSize(event, index)} className="input" type="text" name="size" placeholder="Size" />
                        </div>
                        <div className="w-1/2  px-4 flex">Color<span className="text-red-500">*</span>
                            <input onChange={(event) => upsertVarient(event, index)} className="input" type="text" name="color" placeholder="Color" />
                        </div>
                    </div>

                </div >
            ))}
            <div className="text-end my-4 pr-8">
                <button onClick={() => updateVarientArray()} className="button add font-semibold">Add+</button>
            </div>
            <div className="text-center my-4 pr-8">
                <button onClick={() => addProduct()} className="button add font-semibold">Add Product</button>
            </div>

        </>
    )
};

export default ProductUpsert;

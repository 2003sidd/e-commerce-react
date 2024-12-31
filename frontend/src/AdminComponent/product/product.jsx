import React from "react";
import "./product.css";
const ProductUpsert = () => {
    const [productData, setProductData] = React.useState({
        name: "",
        category: "",
        for: "",
        descripation: "",
        varient: [{
            images: [],
            price: "",
            stock: "",
            color: "",
            size: ""
        }]
    })

    function updateVarientArray(isAdd) {

        let varient = [...productData.varient];
        varient.push({
            images: [],
            price: "",
            stock: "",
            color: "",
            size: ""
        })
        setProductData({ ...productData, varient: varient });


    }
function changeColor(event){
    // setProductData({...productData,for:event.target.value});
    setProductData({
        ...productData,
        for: event.target.value
      });
    console.log("value is",productData)

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

    return (
        <>
            <div>
                <div className="w-full px-4 py-4 flex">
                    Name<span className="text-red-500">*</span>
                    <input className="input" type="text" name="name" placeholder="Name" />
                </div>
                <div className="flex">
                    <div className="w-1/2  px-4 flex">Category<span className="text-red-500">*</span>
                        <input className="input" type="text" name="category" placeholder="Category" />
                    </div>
                    <div className="w-1/2  px-4 flex">For<span className="text-red-500">*</span>
                        <select value={productData.for} onChange={changeColor}>
                            <option value="">Select a size</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="unisez">Unisex</option>
                        </select>

                    </div>
                </div>
                <div className="w-full p-4 flex">

                    Descripation<span className="text-red-500">*</span>
                    <input type="text" name="descripation" placeholder="Descripation" className="h-20 input" />

                </div>

                {productData.varient.map((user, index) => (
                    <div key={index}>
                        <hr />
                        <div className="w-full px-4 py-4 flex">
                            Images
                            <span className="text-red-500">*</span>
                            <input type="file" name="images" />
                            {index != 0 &&
                                <div className="text-end flex-grow" >
                                    <button onClick={() => removeIndex(index)} className="button text-white font-semibold">Remove -</button>
                                </div>
                            }

                        </div>

                        <div className="flex">
                            <div className="w-1/2  px-4 flex">Price<span className="text-red-500">*</span>
                                <input className="input" type="text" name="price" placeholder="Price" />
                            </div>
                            <div className="w-1/2  px-4 flex">Stock<span className="text-red-500">*</span>
                                <input className="input" type="text" name="stock" placeholder="Stock" />
                            </div>
                        </div>
                        <div className="flex py-4">
                            <div className="w-1/2  px-4 flex">Size<span className="text-red-500">*</span>
                                <input className="input" type="text" name="size" placeholder="Size" />
                            </div>
                            <div className="w-1/2  px-4 flex">Colour<span className="text-red-500">*</span>
                                <input className="input" type="text" name="colour" placeholder="Colour" />
                            </div>
                        </div>

                    </div >
                ))}
                <div className="text-end my-4">
                    <button onClick={() => updateVarientArray(true)} className="button add font-semibold">Add+</button>
                </div>
            </div>
        </>
    )
};

export default ProductUpsert;

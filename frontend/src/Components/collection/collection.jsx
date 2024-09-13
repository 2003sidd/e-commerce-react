import React from "react";
import { useParams } from "react-router-dom";
const Collection = (props) => {
    const { handle } = useParams();
    function check(){
        console.log("handle is", handle)
    }
    return (
        <>
        value is : {handle}
        <button onClick={check}>check</button>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur dicta est a incidunt non sunt, magnam mollitia. Veniam officia recusandae rerum possimus atque eligendi laudantium minima, nobis explicabo accusamus reprehenderit?
        </>
    )

};
export default Collection ;
import "./about.css"

const AboutUs=()=>{
    return (
        <>
        <div >
            <div className="story flex p-4">
                <div className="our-story w-1/2 px-4 py-12">
                    <h2 className="text-2xl font-medium mt-2">About us</h2>
                    <p className="mt-2  text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ad obcaecati delectus modi qui asperiores dicta laudantium veniam accusantium voluptate amet, ipsa laboriosam expedita tempore facilis molestiae quas beatae, voluptas odio iste.</p>
                    <p className="mt-4 text-lg">modi qui asperiores dicta laudantium veniam accusantium voluptate amet, ipsa laboriosam expedita tempore facilis molestiae quas beatae, voluptas odio iste.</p>
                </div>
                <div className=" w-1/2 p-4">
                    <img className="our-image" src="src\assets\images\aboutUsImg.jpg" alt="" />
                </div>
            </div>
            <div className="card-1"></div>
            <div className="role"></div>
            <div className="our-services"></div>
        </div>
        </>
    )
};
export default AboutUs;
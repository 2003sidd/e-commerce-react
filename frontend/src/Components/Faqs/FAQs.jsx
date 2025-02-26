import { useState } from "react";



const Faqs = () => {

  const [activeItem, setActiveItem] = useState(0); // Initialize with the first item open

  const aboutItems = [
    {
      title: 'Our Story',
      content: <p>This is the content of our story. It's the first item and is initially displayed.</p>,
    },
    {
      title: 'Our Mission',
      content: <p>This is the content of our mission. It's initially hidden.</p>,
    },
    {
      title: 'Our Values',
      content: <p>This is the content of our values. It's initially hidden.</p>,
    },
  ];

  const handleItemClick = (index) => {
    setActiveItem(index === activeItem ? null : index); // Toggle or close if already open
  };

  return (
    <>
    <div className="about-section">
      {aboutItems.map((item, index) => (
        <div className="item" key={index}>
          <div
            className="item-header text-2xl font-semibold px-4 "
            onClick={() => handleItemClick(index)}>
            <h3 className="p-3  border-[#ccc]">{item.title}</h3>
             {activeItem === index && <div className="px-3" >
                {item.content}
             </div> }
          </div>
         
        </div>
      ))}
    </div>

       
</>
    
  );
};

export default Faqs;
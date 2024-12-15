
import React, { useState } from 'react';

function UserFormArray() {
  // Initialize state to store an array of form values
  const [product, setProduct] = useState({
    name: '',
    descripation: '',
    category: "",
    for: "",
    varient: [
      {
        size: '',
        color: '',
        price: '',
        image: "",
        stock: ""
      }]
  });

  // Handle changes in the input fields
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newUsers = [...users];
    newUsers[index][name] = value;
    setUsers(newUsers);
  };

  // Add a new user form field
  const addUser = () => {
    const varient = [...product.varient];
    varient.push({ size: '', color: '', price: '', image: "", stock: "" })
    // Update the product object immutably
    setProduct({
      ...product, // Spread the existing product data
      varient: varient, // Update the varient array
    });
  };

  // Remove a user form field
  const removeUser = (index) => {
    const newUsers = users.filter((_, i) => i !== index);
    setUsers(newUsers);
  };

  function checkValidation() {
    let isErrorOccured = false;
    const error = {};
    if (product.name == "") {
      error.name = "name is requried";
      isErrorOccured = true;
    }

    if (product.category == "") {
      error.category = "category is requried";
      isErrorOccured = true;
    }

    if (product.for == "") {
      error.for = "for is requried";
      isErrorOccured = true;
    }


    if (product.descripation == "") {
      error.descripation = "descripation is requried";
      isErrorOccured = true;
    }
    for (let i = 0; i < product.varient.size; i++) {
      if (product.varient[i].size == "") {
        error.varient.size = "Size is requried"
      }
    }

  }
  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (checkValidation()) {
      console.log("true")
    } else {
      console.log("true")
    }
    // console.log(users); // You can handle form submission here (e.g., send data to an API)
  };

  return (
    <div>
      <h1>User Form Array</h1>
      <form onSubmit={handleSubmit}>
        {product.varient.map((user, index) => (
          <div key={index} className="user-form">
            <div>
              <label>Name:</label>
              <input
                placeholder="Enter name"
                type="text"
                name="name"
                value={user.name}
                onChange={(event) => handleInputChange(index, event)}

              />
              {/* </div>
            <div> */}
              <label>Email:</label>
              <input placeholder='Enter email' className='border-1 border-rounded border-gray-400 text-blue-600'
                type="email"
                name="email"
                value={user.email}
                onChange={(event) => handleInputChange(index, event)}
              />
            </div>
            <button type="button" onClick={() => removeUser(index)}>
              Remove User
            </button>
          </div>
        ))}

        <button type="button" onClick={addUser}>
          Add User
        </button>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserFormArray;

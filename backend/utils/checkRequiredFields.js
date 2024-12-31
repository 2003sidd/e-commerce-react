function validateField(field, fieldName) {
    if (typeof field === "undefined" || field.trim() === "") {
        return new ApiResponse(400, null, `Provide ${fieldName}`);
    }
    return null; // Validation passed
}

function validateFields(fields) {
    console.log("it comes",fields)

    for (const [key, value] of Object.entries(fields)) {
        const result = validateField(value, key);
            if (result) return result; // Return as soon as a validatio
      }

    // for (let {fieldName, value} of Object.entries(fields)) {
    //     const result = validateField(value, fieldName);
    //     if (result) return result; // Return as soon as a validation error is found
    // }
    console.log("loop complete")

    return null; // All fields are valid
}

module.exports={validateFields};
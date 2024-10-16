

  
class ApiError {
    /**
     *
     * @param {number} statusCode
     * @param {string} message
     * @param {any[]} errors
     * @param {string} stack
     */
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = []
    ) {

        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;


    }
}

module.exports= { ApiError };
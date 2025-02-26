

  
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
        data =null
    ) {

        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
      


    }
}

module.exports= { ApiError };
export class ResponseModel{
     
    constructor(data, message, status){
    this.data=data,
    this.message=message,
    this.status=status    
    };

    sendResponse(response) {
        // Set the status code
        response.statusCode = this.statusCode;
        
        // Set the Content-Type header if it's not already set
        if (!response.getHeader('Content-Type')) {
            response.setHeader('Content-Type', 'application/json');
        }

        // Prepare the response body
        const responseBody = {
            statusCode: this.statusCode,
            message: this.message,
            data: this.data
        };

        // Send the response
        response.end(JSON.stringify(responseBody));
    }


}
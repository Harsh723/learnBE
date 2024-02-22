class ApiResponse {
    constructor(statusCode, data , message = "Success"){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400; //as this is a success response
    }
}

export { ApiResponse };
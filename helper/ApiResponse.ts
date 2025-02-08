class ApiResponse {
  statusCode: number;
  payload: any;
  message: string;
  success: boolean;
  constructor(statusCode = 200, data = {}, message = "Success") {
    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.message = message;
    this.payload = data;
  }
}

export default ApiResponse;

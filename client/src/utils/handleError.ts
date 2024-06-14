interface ErrorResponse {
  response?: any;
}

export const handleError = (error: ErrorResponse) => {
  console.log(error?.response);
};

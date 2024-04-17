const response = (status, message, data) => {
  if (data === undefined || data === "" || data === null) {
    return {
      status: status,
      message: message,
    };
  }

  return {
    status: status,
    message: message,
    data: data,
  };
};

export default response;

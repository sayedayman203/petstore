exports.responseFactory = ({ code, message, data, errors }) => {
  const res = {
    code,
  };

  // set type
  if (code < 400) {
    res.type = "success";
  } else if (400 <= code && code < 500) {
    res.type = "fail";
  } else {
    res.type = "error";
  }

  // set response
  if (message) {
    res.message = message;
  }
  if (data) {
    res.data = data;
  }
  if (errors) {
    res.errors = errors;
  }

  return res;
};

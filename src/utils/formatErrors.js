const formatErrors = (errors) => {
  return errors.reduce((acc, err) => {
    acc[err.path] = err.msg;
    return acc;
  }, {});
};

export default formatErrors;

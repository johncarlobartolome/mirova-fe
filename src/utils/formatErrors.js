const formatErrors = (errors) => {
  return errors.reduce((acc, err) => {
    acc[err.field] = err.message;
    return acc;
  }, {});
};

export default formatErrors;

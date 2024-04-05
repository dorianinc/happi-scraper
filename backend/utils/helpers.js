const doesNotExist = (object) => {
  return {
    message: `${object} couldn't be found`,
  };
};

module.exports = {
  doesNotExist,
};

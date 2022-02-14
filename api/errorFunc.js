const error422 = {
  reqMethodNotSupported: (res) => {
    return res.status(422).send("req_method_not_supported");
  },
  dataIncomplete: (res) => {
    return res.status(422).send("data_incomplete");
  },
  jwtError: (res) => {
    return res.status(422).send("jwt_error");
  },
  userIsNotFound: (res) => {
    return res.status(422).send("user_is_not_found");
  },
};

const error500 = (res, msg) => {
  return res.status(500).send(msg);
};

module.exports = { error422, error500 };

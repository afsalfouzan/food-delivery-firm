const jwt = require("jsonwebtoken");
let jwtSecretKey = "qsedftgh134vbg5t6hgvf5ty6ybvtgvbg";
let jwtTokenGeneration = (user) => {
  return jwt.sign(user, jwtSecretKey);
};
let jwtTokenVerify = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (token == null)
      throw {
        status: 401,
        message: "unauthorized user",
      };

    jwt.verify(token, jwtSecretKey, (err, token) => {
      if (err)
        throw {
          status: 403,
          message: "authentication failed",
        };


      next();
    });
  } catch (e) {
    res.status(e.status).json({
      status: "error",
      message: e.message,
    });
  }
};
module.exports = { jwtTokenGeneration, jwtTokenVerify };

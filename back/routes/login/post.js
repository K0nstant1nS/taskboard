const comparePassword = require('../../utils/compare-passwords');
const crypto = require('crypto-js');
const UserModel = require('../../models/user');
const jwt = require('jsonwebtoken');
const { internalError, notFound, unauthorized } = require('../../utils/errors');

function postLogin (req, res) {
  let body = [];

  req.on('data', function (chunk) {
    body.push(chunk);
  })
  .on('end', async function () {
    body = Buffer.concat(body).toString();
    const user = JSON.parse(body);
    const { email, password } = user;

    if (!email || !password) {
      return internalError(res);
    }

    const userFromBase = await UserModel.findOne({ email });

    if (!userFromBase) {
      return notFound(res);
    }

    const compare = comparePassword(password, userFromBase.password, process.env.SECRET_KEY);
    console.log(compare)

    if (!compare) {
      return unauthorized(res);
    }

    const token = jwt.sign({ _id: userFromBase._id }, process.env.JWT_SECRET_KEY);

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({ token }));
    res.end();
  })
  .on('error', function (e) {
    internalError(res);
  }
  )
}

module.exports = postLogin

    


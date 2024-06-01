const crypto = require('crypto-js');
const { internalError, conflict } = require('../../utils/errors');
const UserModel = require('../../models/user');

function postUser (req, res, client) {
  let body = [];

  req.on('data', function (chunk) {
    body.push(chunk);
  })
  .on('end', async function () {
    body = Buffer.concat(body).toString();
    const user = JSON.parse(body);
    const { email, password } = user;
  
    const hashedPassword = crypto.HmacSHA256(password, process.env.SECRET_KEY).toString();
    
    
    const newUser = new UserModel({
      email,
      password: hashedPassword
    })
  
    try {
      await newUser.save();
    } catch (error) {
      if (error.code === 11000) {
        return conflict(res);
      }
      return internalError(res);
    }

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(newUser));
    res.end();
  }).on('error', function (e) {
    internalError(res);
  });
}

module.exports = postUser

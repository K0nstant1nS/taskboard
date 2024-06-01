const crypto = require('crypto-js');

function comparePasswords (password, hashedPassword, secretKey) {
  return crypto.HmacSHA256(password, secretKey).toString() === hashedPassword;
}

module.exports = comparePasswords

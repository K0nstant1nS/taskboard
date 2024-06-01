const { ObjectId } = require('mongodb');
const { unauthorized } = require('../../utils/errors');
const UserModel = require('../../models/user');

async function getMe({ res, _id}) {
  const user = await UserModel.findById(_id).select('-password');
  if(!user) {
    return unauthorized(res);
  }
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(user));
  res.end();
}

module.exports = getMe

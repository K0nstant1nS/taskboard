async function getUser(req, res, client) {
  const users = await client.db('profile-pet').collection('bots').find({}).toArray();
  console.log(users);
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({name: 'John Doe'}));
  res.end();
}

module.exports = getUser

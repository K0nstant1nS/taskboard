import { Request, Response } from "express";

async function getUser(req: Request, res: Response) {
  const user = req.user;
  console.log(user);
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({name: 'John Doe'}));
  res.end();
}

module.exports = getUser

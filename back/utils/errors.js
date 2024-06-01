function internalError (res, text = 'Internal server error') {
  res.writeHead(500, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({
    status: 500,
    contentType: 'application/json',
    message: text,
    data: null
  }));
  res.end();
}

function notFound (res, text = 'Not found') {
  res.writeHead(404, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({
    status: 404,
    contentType: 'application/json',
    message: text,
    data: null
  }));
  res.end();
}

function conflict (res, text = 'Conflict') {
  res.writeHead(409, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({
    status: 409,
    contentType: 'application/json',
    message: text,
    data: null
  }));
  res.end();
}

function unauthorized (res, text = 'Unauthorized') {
  res.writeHead(401, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({
    status: 401,
    contentType: 'application/json',
    message: text,
    data: null
  }));
  res.end();
}

module.exports = {
  internalError,
  notFound,
  conflict,
  unauthorized
}

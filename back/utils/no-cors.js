const addNoCors = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization, x-requested-with');
}

module.exports = { addNoCors };

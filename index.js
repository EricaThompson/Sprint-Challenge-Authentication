const { server } = require('./server.js');


// server.post('api/register', (req, res) => {

// })























const port = process.env.PORT || 3300;
server.listen(port, () => {
  console.log(`\n=== Server listening on port ${port}\n`);
});

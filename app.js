var express = require('express');
var app = express();

require('./db/controladorDB')(app);
require('./routes/controladorRotas')(app);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

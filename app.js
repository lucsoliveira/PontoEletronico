const bodyParser = require('body-parser');
var express = require('express'),
    app = express();

app.use(bodyParser.json())
app.set('view engine', 'ejs');
app.use(express.static('public')); //SETA PUBLICO TUDO O QUE ESTIVER NA PASTA "PUBLIC"
app.use(express.json());

require('./db/controladorDB')(app);
require('./routes/controladorRotas')(app);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

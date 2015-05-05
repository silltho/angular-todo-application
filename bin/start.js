var Application = require('../app');

var port = 3000;
debugger;
var server = Application.app.listen(port, function () {
  console.log('Server listening at port' + port);
});
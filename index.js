var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var exec = require('child_process').exec;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/github', function (req, res) {
  res.sendStatus(200);
  console.log('GET /github');
});

app.post('/github', function (req, res) {
  console.log(req.body.pusher.name + ' pushed to ' + req.body.repository.name);

  console.log("Pulling latest commit from " + req.body.repository.name);

  exec('git -C ~/'+ req.body.repository.name +' reset --hard', execCallback);
  exec('git -C ~/'+ req.body.repository.name +' clean -df', execCallback);
  exec('git -C ~/'+ req.body.repository.name +' pull -f', execCallback);

  exec('./tasks/'+ req.body.repository.name +'.sh', execCallback);
  res.sendStatus(200);
});

app.listen(5000, function () {
  console.log('listening on port 5000')
});

function execCallback(err, stdout, stderr) {
  if (stdout) console.log(stdout);
  if (stderr) console.log(stderr);
}
// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (req, res) {
  let date = req.params.date;

  if (! date) {
    date = new Date();
    return res.json({
      unix: date.valueOf(),
      utc: date.toUTCString(),
    });
  }

  let parsedDate = isNaN(date) 
    ? new Date(date)
    : new Date(Number(date));
  console.log('bool check: ', Number(date));
  console.log('parsedDate: ', parsedDate);

  if (isNaN(parsedDate.valueOf())) {
    return res.json({error: "Invalid Date"});
  }

  return res.json({
    unix: parsedDate.valueOf(),
    utc: parsedDate.toUTCString(),
  })
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

express = require("express");
const request = require('request');
const app = express();
const cors = require('cors');

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get("/test", (req,res) => {
  res.send('Hello there');
});

app.get("/*", (req, res) => {
  let pathToProxy = req.originalUrl;
  pathToProxy = pathToProxy.substring(1);
  request(
    { url: pathToProxy},
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }
      res.json(JSON.parse(body));
    }
  )
});

app.listen(process.env.PORT || 8080);

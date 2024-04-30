var express = require("express");
var bodyParser = require("body-parser");

var app = express();
const PORT = 8080;
var cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
const data = require("./output1.json");

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

app.get("/", function (req, res) {
  data.layers['layer-1'].items["0REA9CanH"].x = getRandomNumber(100,1800);
  data.layers['layer-1'].items["0REA9CanH"].y = getRandomNumber(600,1800);
  data.layers['layer-1'].items.LhiSqBOPQ.x = getRandomNumber(100,1800);
  data.layers['layer-1'].items.LhiSqBOPQ.y = getRandomNumber(600,1800);
  data.layers['layer-1'].items.NCNg4gcuB.x = getRandomNumber(100,1800);
  data.layers['layer-1'].items.NCNg4gcuB.y = getRandomNumber(600,1800);
  data.layers['layer-1'].items.P5KmOUJaE.x = getRandomNumber(100,1800);
  data.layers['layer-1'].items.P5KmOUJaE.y = getRandomNumber(600,1800);
  data.layers['layer-1'].items["_z0-1ze4j"].x = getRandomNumber(100,1800);
  data.layers['layer-1'].items["_z0-1ze4j"].y = getRandomNumber(600,1800);
  data.layers['layer-1'].items.nveVcjlFT.x = getRandomNumber(100,1800);
  data.layers['layer-1'].items.nveVcjlFT.y = getRandomNumber(600,1800);
  data.layers['layer-1'].items.ukRok8D0E.x = getRandomNumber(100,1800);
  data.layers['layer-1'].items.ukRok8D0E.y = getRandomNumber(600,1800);
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

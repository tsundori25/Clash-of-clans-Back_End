const express = require("express");
const mongoose = require('./mongoose/mongoose');
const router = require('./router/routes');

const app = express();
const port = 3000;

mongoose();

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log("App run on localhost 3000");
});
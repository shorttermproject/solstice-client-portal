const express = require("express");
const app = express();
const fs = require("fs");

const port = process.env.PORT || 8080;
const utilData = JSON.parse(fs.readFileSync('data/utilData.json', 'utf8'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
}

app.get("/data", (req, res) => {
  res.json(utilData); 
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());

app.get('/api', (req, res) => {
  //API logic
  res.send("nothing here yet")
});
 
app.get('*', (req,res) => {
  // All other routes will redirect to React Application
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on port', port);
});
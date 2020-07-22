const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");

mongoose.connect("mongodb+srv://orator:orator@cluster0.sb9jg.mongodb.net/OratorDB?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/event"));
app.use(require("./routes/volunteer"));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(5000,function(){
    console.log("Serever running on port 5000.")
})
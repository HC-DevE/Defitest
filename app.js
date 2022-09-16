const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
// const { now } = require('mongoose');
// const { auth } = require('googleapis/build/src/apis/');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/assets'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/sign-up.html');

});

app.post("/ouivalo", function(req, res) {


    var url, data, date, email, info, message, reponse, success, urlRelais;
    success = false;
    message = req.body.message;
  
    if (req.method === "POST") {
      email = req.body.email;
      date = "15/09/2022";
      urlRelais = req.body.urlRelais;
      message = req.body.message;
      console.log(email, date, urlRelais, message);
      url = "https://script.google.com/macros/s/AKfycby-TJmFFUFTfiNUbMoSIZx8LVtiskQ-bUt4xO6hmrU0XQpJS8IPUBow/exec";
      
      data = {
        "cle": "CLE-TEST-IOT"
      };
      info = {
        "id": email,
        "date": date,
        "urlRelais": urlRelais,
        "message": message
      };
      data["donnees"] = info;
  
  const options = {
    method: 'POST',
    apiKey: "CLE-TEST-IOT",
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const jsonData = JSON.stringify(data);

const request = https.request(url, options, (response) => {
    if(response.statusCode === 200) {
        res.sendFile(__dirname + '/success.html');
    } else {    
        console.log(" Error code " + response.statusCode);
        res.sendFile(__dirname + '/failure.html');
    }
    response.on('data', (data) => {
        console.log(JSON.parse(jsonData));
    });
});
    request.end();
}
});














let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, function () {
    console.log('Server started on port 3000');
});
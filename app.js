const express = require("express");
const app = express();
const http = require("https"); //make sure to https require to interact with API
const bodyParser = require('body-parser');

// const weatherApiKey = "0086242bf82f48c98b32fb8553ec84c6";


app.use(bodyParser.urlencoded({extended:true}))
app.get('/',function(req,res){

    res.sendFile(__dirname + "/index.html");
 
    
  
})
app.post('/',function(req,res){
    var countryName = req.body.country;
    console.log(countryName);
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+countryName+"&appid=0086242bf82f48c98b32fb8553ec84c6&units=metric";
    http.get(url,function(response){
        response.on("data",function(data){
            // to print whole JSON object I get from get request console.log(JSON.parse(data));
            const weatherData = JSON.parse(data);
            const icon = weatherData.weather[0].icon;
            
            const imgUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            const temp = weatherData.main.temp;
            console.log(imgUrl);
            console.log(weatherData);
            res.write("<h1>"+countryName+" Weather is "+temp+" Celcius </h1>");
            res.write("<img src="+ imgUrl +">");
            res.send();
        })
    })
    
})
app.listen(3000,function(){
    console.log("server is running");
})
var express=require('express');
var path=require('path');
var app=express();
app.use(express.static(path.join(__dirname, '222')))

app.listen(3001);
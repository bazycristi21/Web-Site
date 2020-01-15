var fs = require('fs');
fs.readFile('test.json',function (err, data) {
var json=JSON.parse(data); 
fs.writeFileSync('index.html','<html><body>');
for(var i=0; i<json.length;i++)
fs.appendFileSync('index.html','<img src='+json[i].picture.source +'>');
fs.appendFileSync('index.html','</html></body>');
console.log('Operatie completa.');
});
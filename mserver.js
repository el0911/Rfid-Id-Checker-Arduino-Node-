var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mysql=require("mysql");
var SerialPort = require("serialport").SerialPort;
var portName =process.argv[2];
var serialport = new SerialPort(portName,{
  baudRate:9600,
  parser:SerialPort.parsers.readline('\r\n')
});

  var con =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"CLASSICAL1",
    database:"318"
  });

con.connect(function(err){
if(err){
  console.log("Error Created dont know why but node makes sense  "+err);
  return;
}
else{
  console.log("Connected node is so cool forget php f!!! php");
}
});

app.use(function(req,res){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
});
server.listen(8100);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

serialport.on('open', function(){
  // Now server is connected to Arduino
  console.log('Serial Port Opend');

});

serialport.on('data',function(data){

  console.log(data);


});



io.on('connection', function (socket) {
  console.log("connected nigga");
  // socket.emit('init', { hello: 'world' });

  serialport.on('data',function(data){

    con.query("SELECT * FROM `teachers` WHERE id = '"+data+"' " ,function(err,rows){
    if(err){
      console.log("Error Created from querry:"+err);
      return;
    }
    console.log('Data received from Db:\n');
    socket.emit('init',rows);
    console.log(rows);
    console.log("rowws sent");
    });

  })



});

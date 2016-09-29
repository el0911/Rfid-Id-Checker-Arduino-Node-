          var http = require('http');
          var express = require('express');
          var app = express();
          var mysql=require("mysql");
          var SerialPort = require("serialport").SerialPort;
          var server = http.createServer(app).listen(3000);
          var io = require('socket.io').listen(server);
          var portName =process.argv[2];
          app.use(express.static(__dirname + '/public'));


          var serialport = new SerialPort(portName,{
            baudRate:9600,
            parser:SerialPort.parsers.readline('\r\n')
          });

          // app.get('/', function(req, res){
          //   res.sendFile(__dirname + '/chat.html');
          // });

          app.listen(3000,function(){{
            console.log("server listining to the port 3000");
          }});

          io.on('connection',function(){
            console.log("connected: ");
          });

          io.on('init',function(msg){
            console.log(msg);
          });



        //   var con =mysql.createConnection({
        //     host:"localhost",
        //     user:"root",
        //     password:"CLASSICAL1",
        //     database:"fbmeet"
        //   });
        //
        // con.connect(function(err){
        // if(err){
        //   console.log("Error Created dont know why but node makes sense");
        //   return;
        // }
        // else{
        //   console.log("Connected node is so cool forget php f!!! php");
        // }
        // });
        //
        //
        // con.query("SELECT * FROM `notifications`",function(err,rows){
        // if(err){
        //   console.log("Error Created from querry");
        //   return;
        // }
        // console.log('Data received from Db:\n');
        // io.emit("d",rows);
        // console.log(rows);
        // });

// replace this address with your port address
        serialport.on('open', function(){
          // Now server is connected to Arduino
          console.log('Serial Port Opend');

        });

        serialport.on('data',function(data){

          console.log(data);

          io.emit('id',
           { "my": data }
         );
        })

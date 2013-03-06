var ws = require('websocket.io'),
	express=require('express');
	app=express(),
	httpServer = require('http').createServer(app),
	server = ws.attach(httpServer);
var fs = require('fs');
httpServer.listen(30000);
app.get('/', function(req, res){
	res.sendfile('index.html');
});
app.use(express.static('files'));
server.on('connection', function(socket){
	var mode=0;

	var stream;	console.log("connection")
	socket.on('message', function(data){
		if(mode==0){
			mode++;
			try{
				console.log(data)
				var dat = JSON.parse(data);
				var name = dat.name;
				var size = dat.size
				var path = "files/"+size+"_"+name;
				var info=fs.stat(path, function(err, info){
					console.log("info",info);
					var offset=0;
					if(!err){
						console.log("resume up");
						offset=info.size;//resume
						stream = fs.createWriteStream(path, {flags:"a"});
					}else{
						console.log("normal up");
						stream = fs.createWriteStream(path, {flags:"w"});
					}
					console.log("send offset?", offset)
					socket.send(JSON.stringify(offset));
				});
			}catch(e){
				console.log(e)
				socket.send("err");
				socket.close();
				return;
			}
		}else{
			console.log(data.length);
			stream.write(data);
			socket.send("ok");
		}
	});
	socket.on('close', function(){
		console.log("close");
		stream ? stream.end() : "";
	});
});

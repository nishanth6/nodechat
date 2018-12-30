
function sockets(io){
io.on('connection',function(socket){
    console.log("connected");
    var uIdSocket=socket.request.session.uid;
    socket.on('send',function(data){
        console.log("message sent"+data.roomNo);
        socket.broadcast.to("Room-"+data.roomNo).emit('recieve', data);
     });

     socket.on("join",function (roomNo){
     console.log("Room joined :"+roomNo);
     socket.join("Room-"+roomNo);
     });
   });
}
module.exports = sockets;
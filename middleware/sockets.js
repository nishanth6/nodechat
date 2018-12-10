
function sockets(io){
io.on('connection',function(socket){
    console.log("connected");
    var uIdSocket=socket.request.session.uid;
    socket.on('send',function(data){
        console.log("message sent"+data);
        io.emit('recieve', data);
     });
   });
}
module.exports = sockets;
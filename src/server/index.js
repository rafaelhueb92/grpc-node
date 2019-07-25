const grpc = require("grpc");
const notes = require("./services/notes");
const server = new grpc.Server();

server.addService(notes.noteService, notes.services);

server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
console.log("Server running at http://127.0.0.1:50051");
server.start();

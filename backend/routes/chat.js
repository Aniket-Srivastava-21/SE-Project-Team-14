import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";


const app = express();

app.use(cors());

let rooms = new Map();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
})

io.on("connection", (socket) => {
   // socket.join("123");
    socket.on("join_room", async (data,user) => {
        socket.join(data);
        rooms.set(socket.id,data);
        console.log(rooms);
        const sockets = await io.in(data).fetchSockets().then((clients) =>{
            console.log(clients.length);
            io.to(data).emit("check_users", clients.length);
        });
        
       // socket.to(data).emit("receive_message", "User joined");
        
        console.log(`User ${socket.id} connected at room ${data}`);
    })
    socket.on("send_message", (data, room) => {
        console.log(data);
        if(room in socket.rooms){
            console.log("Room exists");
        }else{
            console.log("Room not there");
        }
        //socket.broadcast.emit("receive_message", data);
        console.log(socket.rooms);
        socket.to(room).emit("receive_message", data);
    })
    
    socket.on("disconnect", async () => {
        console.log("User Disconnected", socket.id);
        let room_needed = rooms.get(socket.id);
        rooms.delete(socket.id);
        const sockets = await io.in(room_needed).fetchSockets().then((clients) =>{
            console.log(clients.length);
            io.to(room_needed).emit("check_users", clients.length);
        });

        
    })
})

server.listen(3001, () =>{
    console.log("Socket Server running at port 3001");
})

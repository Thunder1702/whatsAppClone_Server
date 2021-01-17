import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { initDb } from "./db";
import SocketIOStatic,{ Socket } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

let cfg = require("./config.json"); // config file


const app = express();

const server = require("http").createServer(app);
const options = {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
  },
};

const sio = new SocketIOStatic.Server(server, options);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Request for Contacts
import newContact from "./routes/newContact";
import deleteContact from "./routes/deleteContact";
import editContact from "./routes/editContact";
import getContact from './routes/getContact';
import getContacts from "./routes/getContacts";
import getAllContactsFromUser from "./routes/getAllContactsFromUser";
import getUsernameFromContact from './routes/getUsernameFromContact';
//Eventuel in eine route --> Message und dort ob GET oder POST Befehl kommt
//Requests for Messages
import sendMessage from "./routes/sendMessage";
import getMessage from "./routes/getMessage";
import getMessages from "./routes/getMessages";
import chatHistoryUserContact from "./routes/chathistoryUserContact";
//Requests for Photos
import getImageUser from "./routes/getImageUser";
import getImageContact from "./routes/getImageContact";
import uploadPhotot from "./routes/uploadPhoto";
import getPhotos from "./routes/getPhotos";
//Requests for User or Profile
import registerUser from "./routes/registerUser";
import editUser from "./routes/editUser";
import getUser from "./routes/getUser";
import signIn from "./routes/signIn";
//Request for Max id value
import maxMessageId from "./routes/getMaxMessageId";
import maxPhotoId from "./routes/getMaxPhotoId";
import maxContactId from "./routes/getMaxContactId";


//Contacts
app.use("/contacts/newContact", newContact);
app.use("/contacts/deleteContact", deleteContact);
app.use("/contacts/editContact", editContact);
app.use("/contacts/getContact", getContact);
app.use("/contacts/getContacts", getContacts);
app.use("/contacts/getAllContactsFromUser", getAllContactsFromUser);
app.use("/contacts/getUsernameFromContact", getUsernameFromContact);
//Message
app.use("/mainChat/sendMessage", sendMessage);
app.use("/mainChat/getMessage", getMessage);
app.use("/mainChat/getMessages", getMessages);
app.use("/mainChat/getChatHistoryUserContact", chatHistoryUserContact);
//Photo
app.use("/getImageUser", getImageUser);
app.use("/getImageContact", getImageContact);
app.use("/mainChat/uploadPhoto", uploadPhotot);
app.use("/mainChat/getPhotos", getPhotos);
//User or Profile
app.use("/login/register", registerUser);
app.use("/login/signIn", signIn);
app.use("/profile", getUser);
app.use("/profile/edit", editUser);
//Max id value
app.use("/maxPhotoId", maxPhotoId);
app.use("/maxContactId", maxContactId);
app.use("/maxMessageId",maxMessageId);


app.use("/whatsAppClone_Service/profilBilder/:picName", (req, res)=> {
  let picName = req.params.picName;
  console.log(__dirname);
  res.sendFile(`profilBilder/${picName}`, {root: __dirname});
});

app.use("/", (req, res) => {
  res.send("Welcome to WhatsAppClone server");
});



let clientList: any[] = [];
//let connectionTo: any[] = [];
let chatRoomList: any[] = [];


let getClientWithID = (id: string) => {
  for (let i = 0; i < clientList.length; i++) {
    if (clientList[i].id === id) {
      return clientList[i];
    }
  }
};


sio.on("connection", (socket: Socket) => {

  if(!getClientWithID(socket.id)){
    clientList.push(socket);
    console.log(socket.id);
  }else return;

  socket.on('sendMessage', message => {
    if(message === 'sendMessage'){
      setTimeout(() => {
        socket.broadcast.send("Update");
        console.log("Broadcast gesendet.");
      },1000);
    }
  });

  socket.on("disconnect", () => {
    let index = -1;

    for (let i = 0; i < clientList.length; i++) {
      if (clientList[i].id === socket.id) {
        index = i;
      }
    }
    if (index > -1) {
      clientList.splice(index, 1);
    }
    console.log("client disconnected - id" + socket.id);
    console.log("Connected Clients: " + clientList.length);
  });
  console.log("client connected - id " + socket.id);
  console.log("Connected Clients: " + clientList.length);

});


initDb().then(
  () => {
    server.listen(process.env.server_port, () => {
      console.log("Listening on port " +process.env.server_port + "...");
    });
  },
  () => {
    console.log("Failed to connect to DB!");
  }
);

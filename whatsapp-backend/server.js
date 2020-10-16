//importing
import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import cors from "cors";

import Messages from "./dbSchema.js";

//app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1088150",
  key: "126f1214cd5f5ea60828",
  secret: "1884d50a007677d3fc15",
  cluster: "ap2",
  encrypted: true,
});

//middlewares
app.use(express.json());
app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   next();
// });

//db config
const url =
  "mongodb+srv://admin:mSk8WsmO49fQsqtX@cluster0.ncqfl.mongodb.net/whatsappdb?retryWrites=true&w=majority";

mongoose.connect(url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("database connected");
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();
  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log("error triggering pusher");
    }
  });
});

//app routes
app.get("/", (req, res) => res.status(200).send("Hello World!!!"));

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;
  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

//listener
app.listen(port, () => console.log(`server running on port ${port}`));

//psswd=mSk8WsmO49fQsqtX

//mongodb+srv://admin:<password>@cluster0.ncqfl.mongodb.net/<dbname>?retryWrites=true&w=majority

const Moralis = require("moralis");
const express = require("express");
const Parse = require("parse/node");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
var fs = require("fs");
const { create, globSource } = require("ipfs-http-client");
const ipfs = create("http://139.59.75.20:5001");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

//initialize Moralis
Moralis.initialize("RrKpMiHThO0v1tXiKcxJuBacU35i7UidwNwQq0as");

Moralis.serverURL = "https://58zywcsvxppw.usemoralis.com:2053/server";

app.use(cors());

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static("public"));

//Database Linking

const { MongoClient } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const client = new MongoClient(uri);

// Database Name
const dbName = "dbeats";

const trackRouter = require("./routes/track");
const userRouter = require("./routes/user");

var testAPIRouter = require("./routes/api_status");

app.use("/track", trackRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`server is listening on Port  ${port}`);
});

app.use("/API-status", testAPIRouter);

// create a GET route
app.get("/express_backend", (req, res) => {
  //Line 9
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" }); //Line 10
});

async function connectDB() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);

  const collection = db.collection("data");
  // create a document to be inserted

  return "done.";
}

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/feed", (req, res) => {
  loadFeed("feed", res);
});

// app.get("/:username", (req, res) => {

//   loadArtist(req.params.username,res);
//   res.send("Your name is "+ req.params.username + "\n");
// });

// app.get("/:username/:track", (req, res) => {

//   loadTrack(req.params.username, req.params.track,res)

// });

app.post("/signup", (req, res) => {
  const walletID = req.body.walletId;
  const fullName = req.body.name;
  const userName = req.body.username;

  saveToDBSignUp(walletID, fullName, userName);

  res.redirect("/feed");
});

app.post("/upload-video", (req, res) => {
  console.log(req.body);
  console.log(req.files);
  const {
    videoName,
    category,
    ratings,
    tags,
    description,
    allowAttribution,
    commercialUse,
    derivativeWorks,
  } = req.body;

  const { videoImage, videoFile } = req.files;

  const userId = req.body.userId;
  const file = req.files.videoFile;
  const albumFile = req.files.videoImage;

  var currentTimeInSeconds = Math.floor(Date.now() / 1000); //unix timestamp in seconds

  const time = currentTimeInSeconds;

  const fileName = videoFile.name + path.extname(videoFile.name); //path.extname(videoFile.name)
  const filePath = fileName;

  const videoArtPath = videoImage.name;

  var videoHashLink = null;
  var albumhashLink = null;

  file.mv(filePath, async (err) => {
    try {
      const fileHash = await addFile(filePath);

      videoHashLink = "https://ipfs.io/ipfs/" + fileHash;
      console.log("video Uploaded Successfully!: " + fileHash);

      fs.unlink(filePath, (err) => {
        if (err) console.log(err);
      });

      // video Uploaded Now Upload AlbumArt
      albumFile.mv(videoArtPath, async (err) => {
        try {
          const fileHash = await addFile(videoArtPath);

          albumhashLink = "https://ipfs.io/ipfs/" + fileHash;
          console.log("Album Art Uploaded Successfully!: " + fileHash);

          fs.unlink(videoArtPath, (err) => {
            if (err) console.log(err);
          });

          //AlbumArt Uploaded Now Save Both to DB
          console.log(
            "video Link : " +
              videoHashLink +
              "\nAlbumArt Link : " +
              albumhashLink
          );

          if (albumhashLink != null && videoHashLink != null) {
            console.log("Saving To Database!");
            saveVideoToDB(
              userId,
              videoName,
              albumhashLink,
              videoHashLink,
              category,
              ratings,
              tags,
              description,
              allowAttribution,
              commercialUse,
              derivativeWorks,
              time
            );

            return res.status(201).send("Video Uploaded Successfully!");
          } else {
            console.log("ERRRRRRRRRRRRRRRR");

            return res.render("upload", { error: "Error!" });
          }

          if (err) {
            console.log("Error : failed to Upload the Album Art File");
            return res.status(500).send(err);
          }
        } catch (error) {
          console.log(error);
        }
      });

      if (err) {
        console.log("Error : failed to Upload the Video File");
        return res.status(500).send(err);
      }
    } catch (error) {
      console.log(error);
    }
  });
});

app.post("/upload", (req, res) => {
  var datetime = new Date();
  console.log(datetime);
  console.log("-----------REQUEST DATA-----------\n");
  // const obj = JSON.stringify(req.body)
  // Store JSON data in a JS variable

  const {
    trackName,
    genre,
    mood,
    tags,
    description,
    isrc,
    iswc,
    allowAttribution,
    commercialUse,
    derivativeWorks,
  } = req.body;

  const { trackImage, trackFile } = req.files;

  const userId = req.body.userId;
  const file = req.files.trackFile;
  const albumFile = req.files.trackImage;

  var currentTimeInSeconds = Math.floor(Date.now() / 1000); //unix timestamp in seconds

  const time = currentTimeInSeconds;

  const fileName = trackFile.name + path.extname(trackFile.name); //path.extname(trackFile.name)
  const filePath = fileName;

  const trackArtPath = trackImage.name;

  var trackHashLink = null;
  var albumhashLink = null;

  file.mv(filePath, async (err) => {
    try {
      const fileHash = await addFile(filePath);

      trackHashLink = "https://ipfs.io/ipfs/" + fileHash;
      console.log("Track Uploaded Successfully!: " + fileHash);

      fs.unlink(filePath, (err) => {
        if (err) console.log(err);
      });

      // Track Uploaded Now Upload AlbumArt
      albumFile.mv(trackArtPath, async (err) => {
        try {
          const fileHash = await addFile(trackArtPath);

          albumhashLink = "https://ipfs.io/ipfs/" + fileHash;
          console.log("Album Art Uploaded Successfully!: " + fileHash);

          fs.unlink(trackArtPath, (err) => {
            if (err) console.log(err);
          });

          //AlbumArt Uploaded Now Save Both to DB
          console.log(
            "Track Link : " +
              trackHashLink +
              "\nAlbumArt Link : " +
              albumhashLink
          );

          if (albumhashLink != null && trackHashLink != null) {
            console.log("Saving To Database!");
            saveTrackToDB(
              userId,
              trackName,
              albumhashLink,
              trackHashLink,
              genre,
              mood,
              tags,
              description,
              isrc,
              iswc,
              allowAttribution,
              commercialUse,
              derivativeWorks,
              time
            );

            return res.status(201).send("Track Uploaded Successfully!");
          } else {
            console.log("ERRRRRRRRRRRRRRRR");

            return res.render("upload", { error: "Error!" });
          }

          if (err) {
            console.log("Error : failed to Upload the Album Art File");
            return res.status(500).send(err);
          }
        } catch (error) {
          console.log(error);
        }
      });

      if (err) {
        console.log("Error : failed to Upload the Track File");
        return res.status(500).send(err);
      }
    } catch (error) {
      console.log(error);
    }
  });
});

const addFile = async (filePath) => {
  const file = fs.readFileSync(filePath);
  const fileAdded = await ipfs.add({ path: filePath, content: file });
  console.log(fileAdded);
  //const fileHash = fileAdded[0].hash;

  return fileAdded.cid;
};

connectDB()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

async function saveToDBSignUp(walletID, fullName, userName) {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);

  const collection = db.collection("data");

  collection.insertOne({
    userId: walletID,
    fullName: fullName,
    userName: userName,
  });

  return "done.";
}

async function saveTrackToDB(
  userId,
  trackName,
  trackImage,
  link,
  genre,
  mood,
  tags,
  description,
  isrc,
  iswc,
  allowAttribution,
  commercialUse,
  derivativeWorks,
  time
) {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);

  const collection = db.collection("data");
  var myquery = { userId: userId };
  var newvalues = {
    $push: {
      tracks: {
        trackName: trackName,
        trackImage: trackImage,
        link: link,
        genre: genre,
        mood: mood,
        tags: tags,
        description: description,
        isrc: isrc,
        iswc: iswc,
        allowAttribution: allowAttribution,
        commercialUse: commercialUse,
        derivativeWorks: derivativeWorks,
        time: time,
      },
    },
  };
  // create a document to be inserted
  //const doc = { userId: userId, tracks: {trackName: trackName, link: link , genre: genre, tags:tags, description:description }};
  db.collection("data").updateOne(myquery, newvalues, { upsert: true });
  // const result = await collection.insertOne(doc);
  // the following code examples can be pasted here...
  console
    .log
    //` documents were inserted with the _id: ${result.insertedId}`,
    ();
  console.log("Track Added!:");

  var a = new Date(time * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;

  console.log("Log: " + time);

  return "done.";
}

async function saveVideoToDB(
  userId,
  videoName,
  videoImage,
  link,
  category,
  ratings,
  tags,
  description,
  allowAttribution,
  commercialUse,
  derivativeWorks,
  time
) {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);

  const collection = db.collection("data");
  var myquery = { userId: userId };
  var newvalues = {
    $push: {
      videos: {
        videoName: videoName,
        videoImage: videoImage,
        link: link,
        category: category,
        ratings: ratings,
        tags: tags,
        description: description,
        allowAttribution: allowAttribution,
        commercialUse: commercialUse,
        derivativeWorks: derivativeWorks,
        time: time,
      },
    },
  };
  // create a document to be inserted
  //const doc = { userId: userId, videos: {videoName: videoName, link: link , genre: genre, tags:tags, description:description }};
  db.collection("data").updateOne(myquery, newvalues, { upsert: true });
  // const result = await collection.insertOne(doc);
  // the following code examples can be pasted here...
  console
    .log
    //` documents were inserted with the _id: ${result.insertedId}`,
    ();
  console.log("Video Added!:");

  var a = new Date(time * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;

  console.log("Log: " + time);

  return "done.";
}

async function loadFeed(page, res) {
  connectDB();
  const db = client.db(dbName);
  const collection = db.collection("data");

  try {
    collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      if (result.length > 0) {
        console.log(result[0].tracks[0].trackName);
      }
      res.render(page, { result });
    });
  } catch (error) {
    console.log(error);
  }
}

async function loadArtist(username, res) {
  connectDB();
  const db = client.db(dbName);
  const collection = db.collection("data");
  const query = { username: username };

  collection.findOne(query).then((result) => {
    if (result) {
      console.log(result);
      return result;
    } else {
      var alert = "No document matches the provided query.";
      console.log(alert);
      return alert;
    }
    return result;
  });
}

async function loadTrack(username, track, res) {
  connectDB();
  const db = client.db(dbName);
  const collection = db.collection("data");
  const query = { username: username };

  collection.findOne(query).then((result) => {
    if (result) {
      console.log(result.tracks.length);
      for (var i = 0; i < result.tracks.length; i++) {
        console.log(i + "th TRACK -----");
        var trckName = result.tracks[i];
        if (trckName.trackName == track) {
          console.log("Track Found:");
          res.render("upload", { trckName });
        }
        //console.log( result.tracks[i].toArray().find(track));
      }

      return result;
    } else {
      var alert = "No document matches the provided query.";
      console.log(alert);
      return alert;
    }
    return result;
  });
}

async function main() {
  const args = minimist(process.argv.slice(2));
  const token = args.token;

  if (!token) {
    return console.error(
      "A token is needed. You can create one on https://web3.storage"
    );
  }

  if (args._.length < 1) {
    return console.error("Please supply the path to a file or directory");
  }

  const storage = new Web3Storage({ token });
  const files = [];

  for (const path of args._) {
    const pathFiles = await getFilesFromPath(path);
    files.push(...pathFiles);
  }

  console.log(`Uploading ${files.length} files`);
  const cid = await storage.put(files);
  console.log("Content added with CID:", cid);
}

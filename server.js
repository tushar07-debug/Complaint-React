// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const { MongoClient } = require("mongodb");
// const multer = require("multer");
// const cors = require("cors");
// const path = require("path");

// // Use CORS middleware
// app.use(cors());

// const url = "mongodb://localhost:27017/";
// const client = new MongoClient(url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const dbName = "mri";

// // Multer configuration for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads/");
//   },
//   filename: function (req, file, cb) {
//     const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniquePrefix + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// app.use(bodyParser.urlencoded({ extended: false }));

// app.use(bodyParser.json());

// // Connect to MongoDB
// client
//   .connect()
//   .then(() => {
//     console.log("Connected successfully to MongoDB");

//     // Start the server after MongoDB connection is established
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => {
//       console.log(`Server is running on http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("Failed to connect to MongoDB:", err);
//     process.exit(1);
//   });

// app.post("/submit-form", upload.single("uploaded_file"), async (req, res) => {
//   let { user_email, user_name, user_location, user_message } = req.body;
//   let img_path = req.file ? req.file.path : "";

//   try {
//     const db = client.db(dbName);
//     const collection = db.collection("complaints");

//     // Insert data into MongoDB
//     const result = await collection.insertOne({
//       email: user_email,
//       name: user_name,
//       location: user_location,
//       message: user_message,
//       img_path: img_path,
//     });
//     console.log("Inserted document with id:", result.insertedId);

//     res.status(200).json({ message: "Form submitted successfully!" });
//   } catch (err) {
//     console.error("Error inserting document:", err);
//     res.status(500).json({ message: "Error submitting form" });
//   }
// });


const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

// Use CORS middleware
app.use(cors());

const url = "mongodb://localhost:27017/";
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dbName = "mri";

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniquePrefix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// Connect to MongoDB
client
  .connect()
  .then(() => {
    console.log("Connected successfully to MongoDB");

    // Start the server after MongoDB connection is established
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });

app.post("/submit-form", upload.single("uploaded_file"), async (req, res) => {
  let { user_email, user_name, user_location, user_message } = req.body;
  let img_path = req.file ? req.file.path : "";

  try {
    const db = client.db(dbName);
    const collection = db.collection("complaints");

    // Insert data into MongoDB
    const result = await collection.insertOne({
      email: user_email,
      name: user_name,
      location: user_location,
      message: user_message,
      img_path: img_path,
    });
    console.log("Inserted document with id:", result.insertedId);

    res.status(200).json({ message: "Form submitted successfully!" });
  } catch (err) {
    console.error("Error inserting document:", err);
    res.status(500).json({ message: "Error submitting form" });
  }
});

app.get("/api/complaints", async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection("complaints");

    const complaints = await collection.find().toArray();
    res.json(complaints);
  } catch (err) {
    console.error("Error fetching complaints:", err);
    res.status(500).json({ message: "Error fetching complaints" });
  }
});
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config(); // he will find an env file and then he will read a key from it
const cors = require('cors');

const app = express();

app.get("/test", (req, res) => {
    res.send("Hello world")
});

app.use(express.json());

// "when there is a request where route starts with "/argonaut" use this functions -> argonautRoute"
// http://localhost:5555/argonaut/test
app.use("/argonaut", require("./routes/argonautRoute"));

app.use(cors({
    origin: "http://localhost:3000",
}));

mongoose.connect(process.env.MONGO_URL).then(
    () => { console.log("connected to Mongo DB") },
    err => { console.log(err); }
);

app.listen(5555, () => console.log("Server is up and running on the port 5555"));
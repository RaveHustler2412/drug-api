const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');

app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

const authRoute = require("./routes/auth");


//Connect to DB
// mongoose.connect(
//   'mongodb://localhost:27017/donate',
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false,
//       useCreateIndex: true,
//     },
//     () => {
//       console.log("DB connected");
//     }
//   );

mongoose.connect('mongodb://vaideesh:vaideesh123@cluster0-shard-00-00.in4ky.mongodb.net:27017,cluster0-shard-00-01.in4ky.mongodb.net:27017,cluster0-shard-00-02.in4ky.mongodb.net:27017/systemDB?ssl=true&replicaSet=atlas-n0eu9o-shard-0&authSource=admin&retryWrites=true&w=majority')




// // //Middlewares
app.use(express.json());

// // //Routes Middleware
app.use("/api/auth", authRoute);






app.listen(7000, function () { 
    console.log("Server is running on port 7000");
});
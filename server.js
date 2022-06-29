express = require("express");
app = express();

var cors = require("cors");
var path = require("path");
// use it before all route definitions
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

const http = require("http");
var PythonShell = require('python-shell').PythonShell;
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.json());

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("message", (data) => {
    console.log(`Client has sent us: ${data}`);

    // socket.emit("message", `${data}`);

    // io.emit("message", `${data}`);
  });
});

app.post("/sendData", (req, res) => {
    io.emit("loading", true);

    var pathIndex = './src/assets/scripts';
    var args = ["--size", "500","--failure-rate", "0.1"]
    var options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: path.join(__dirname, pathIndex),
        args: args, //An argument which can be accessed in the script using sys.argv[1]
    };

    // Method 1 (Run Python Scripts)
    PythonShell.run('simulation.py', options, function (err, result) {
        if (err)
            throw err;
        // result is an array consisting of messages collected
        //during execution of script.
        console.log('result: ', result.toString());
        // Return Data To Angular

        io.emit("message", JSON.parse(result));
    });

  // io.emit("message", 'sd');
  res.send({ test: "Data Sent!" });
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});

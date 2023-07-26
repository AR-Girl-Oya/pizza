const { Server } = require('socket.io');      
const express = require('express');
const cors = require('cors');
const http = require('http');
const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./config/mongoose.config');
require('./routes/pizzas.routes')(app);

const server  = http.createServer(app)
const io = new Server(server , {
    cors: {
        origin: "*"
    }
});



const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "../client/build");

app.use(express.static(buildPath));

app.get("/*", function(req, res){
    res.sendFile(
        path.join(__dirname, "../client/build/index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );
});

server.listen(8000, () => console.log('Listening to port 8000'));

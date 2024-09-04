const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/Todo");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://todo-masters.vercel.app",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
});
const serverio = new Server(server, {
    cors: {
        origin: "*"
    }
});

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://rishivishwa4877:rishiMongodb@cluster0.k16x7.mongodb.net/Todo?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Failed to connect to MongoDB", err));

app.get('/', (req, res) => {
    res.json("hello hii");
});

app.get('/get', (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({ task: task }).then(result => {
        server.emit('todoUpdated');  // Notify all clients about the update
        res.json(result);
    })
    .catch(err => res.json(err));
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete({ _id: id })
        .then(result => {
            server.emit('todoUpdated');  // Notify all clients about the update
            res.json(result);
        })
        .catch(err => res.json(err));
});

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { task } = req.body;

    TodoModel.findByIdAndUpdate(id, { task: task }, { new: true })
        .then(result => {
            server.emit('todoUpdated');  // Notify all clients about the update
            res.json(result);
        })
        .catch(err => res.json(err));
});

server.listen(3000, () => {
    console.log("Server is Started....");
});

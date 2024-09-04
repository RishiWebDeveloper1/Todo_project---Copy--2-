const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http"); // Import the http module
const TodoModel = require("./Models/Todo");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = new Server(server, {
    cors: {
        origin: ["https://todo-masters.vercel.app"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
});

app.use(cors({
    origin: ["https://todo-masters.vercel.app"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));
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
    TodoModel.create({ task: task })
        .then(result => {
            io.emit("todoAdded", result); // Emit event for live update
            res.json(result);
        })
        .catch(err => res.json(err));
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    TodoModel.findByIdAndUpdate(id, { task: task }, { new: true })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// Start the server using the HTTP server instance
server.listen(3000, () => {
    console.log("Server is Started....");
});

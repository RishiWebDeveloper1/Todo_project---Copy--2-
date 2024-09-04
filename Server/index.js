const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const TodoModel = require("./Models/Todo")


const app = express();
app.use(cors(
    {
        origin: [""],
        methods: ["POST", "GET", "PUT"],
        credentials: true
    }
))
app.use(express.json())

// mongoose.connect('mongodb://127.0.0.1:27017/Todo')
mongoose.connect('mongodb+srv://rishivishwa4877:rishiMongodb@cluster0.k16x7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Failed to connect to MongoDB", err));


app.get('/', (req, res) => {
        res.json("hello hii")
})

app.get('/get', (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({ task: task }).then(result => res.json(result))
        .catch(err => res.json(err))
})

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete({ _id: id })
        .then(result => { res.json(result) })
        .catch(err => { res.json(err) })
})

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { task } = req.body;

    TodoModel.findByIdAndUpdate(id, { task: task }, { new: true })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.listen(3000, () => {
    console.log("Server is Started....")
})
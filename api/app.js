const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { List } = require('./db/models/listmodel');
const { Task } = require("./db/models/taskmodel");
const mongoose = require("mongoose");

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB successfully"))
.catch((err) => console.error("MongoDB connection error:", err));

app.use(bodyParser.json());
app.use(cors());

// CORS headers (optional, if already handled by cors())
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", ["GET", "POST", "HEAD", "PUT", "PATCH", "OPTIONS", "DELETE"]);
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// Routes

// Get all lists
app.get('/lists', async (req, res) => {
    try {
        const lists = await List.find({});
        res.send(lists);
    } catch (error) {
        res.status(500).send('Error fetching lists');
    }
});

// Create a new list
app.post('/lists', async (req, res) => {
    try {
        const { title } = req.body;
        const newList = new List({ title });
        const listDoc = await newList.save();
        res.send(listDoc);
    } catch (error) {
        res.status(400).send('Error creating list');
    }
});

// Update a list
app.patch('/lists/:id', async (req, res) => {
    try {
        await List.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }).then(() => {
            res.send({'message': "updated successfully"});
        })
    } catch (error) {
        res.status(400).send('Error updating list');
    }
});

// Delete a list
app.delete('/lists/:id', async (req, res) => {
    try {
        const removedListDoc = await List.findOneAndDelete({ _id: req.params.id });
        res.send(removedListDoc);
    } catch (error) {
        res.status(400).send('Error deleting list');
    }
});

// Get all tasks for a specific list
app.get('/lists/:listId/tasks', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.listId)) {
            return res.status(400).send('Invalid list ID');
        }
        const tasks = await Task.find({ _listId: req.params.listId });
        res.send(tasks);
    } catch (error) {
        res.status(500).send('Error fetching tasks');
    }
});

// Create a new task for a specific list
app.post('/lists/:listId/tasks', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.listId)) {
            return res.status(400).send('Invalid list ID');
        }
        const { title } = req.body;
        const newTask = new Task({ title, _listId: req.params.listId });
        const newTaskDoc = await newTask.save();
        res.send(newTaskDoc);
    } catch (error) {
        res.status(400).send('Error creating task');
    }
});

// Update a task
app.patch('/lists/:listId/tasks/:taskId', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.listId) || !mongoose.Types.ObjectId.isValid(req.params.taskId)) {
            return res.status(400).send('Invalid ID');
        }
        await Task.findOneAndUpdate({ _id: req.params.taskId, _listId: req.params.listId }, { $set: req.body });
        res.send({ message: "Updated successfully" });
    } catch (error) {
        res.status(400).send('Error updating task');
    }
});

// Delete a task
app.delete('/lists/:listId/tasks/:taskId', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.listId) || !mongoose.Types.ObjectId.isValid(req.params.taskId)) {
            return res.status(400).send('Invalid ID');
        }
        const removedTaskDoc = await Task.findOneAndDelete({ _id: req.params.taskId, _listId: req.params.listId });
        res.send(removedTaskDoc);
    } catch (error) {
        res.status(400).send('Error deleting task');
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

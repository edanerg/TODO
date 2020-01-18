const express = require('express');
const Task = require('../models/task');
const router = express.Router();
const auth = require('../middlewares/googleAuth');

router.get('/', auth, (req, res) => {
    let query = Task.find({userId: req.googleUser.sub}, null, {sort: {creationDate: -1}})
    let promise = query.exec();
    promise.then(tasks => {
        console.log('tasks are', tasks);
        res.json(tasks)
    });
});

router.post('/', auth, (req, res) => {
    const newTask = new Task({
        ...req.body,
        userId: req.googleUser.sub
    });
    newTask.save().then(task => res.json(task));
});

router.delete('/:id', auth, (req, res) => {
    Task.deleteOne({_id: req.params.id, userId: req.googleUser.sub}).then(() => res.json({success: true}));
});

router.put('/:id', auth, (req, res) => {
    Task.updateOne({ _id: req.params.id, userId: req.googleUser.sub}, req.body).then(() => {
        Task.findById(req.params.id).then(task => res.json(task))
    })
});

router.delete('/', auth, (req, res) => {
    Task.deleteMany({userId: req.googleUser.sub}).then(() => res.json({success: true}));
})


module.exports = router;
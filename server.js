const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');
const config = require('./config');

const app = express();

app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});
app.use('/tasks', taskRoutes);
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`port is, ${port}`));
mongoose.connect(config.mongoDBURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(console.log('db success'));
const express = require('express');
const https = require('https');
const app = express();
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConfig = require('./database/db');
const fs = require('fs');
// 
app.use(bodyParser.json());
app.use(cors());
//config
app.set('port', process.env.PORT || 3000);

//import routes
const todosRoute = require('./routes/todos.routes');

app.use('/todos', todosRoute);

//routes
app.get('/', (req, res) => {
    res.send('We are now on home')
})

// Connect to DB
// mongoose.connect(dbConfig.db, { useNewUrlParser: true }, () => 
//     console.log('connected to DB')
// );
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
        console.log('Mongo is connected');
    }, 
    error => {
        console.log('Mongo could not connected:' + error);
    }
);

const options = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem')
  };
 
// https.createServer(options, app).listen(app.get('port'), () => {
//     console.log(`Server on port ${app.get('port')}`);
// });

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
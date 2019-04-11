const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', (socket) =>{
    socket.on('connectionRoom', box => {
        socket.join(box);
    })
})

mongoose.connect('mongodb+srv://root:root@cluster0-rt7cd.mongodb.net/omnistack?retryWrites=true', 
    {
        useNewUrlParser: true
    });

app.use((req, res, next) => {
    req.io = io;
    return next();
})
/** Prepara o servidor para tratar requisições json*/
app.use(express.json());

/** Prepara o servidor para tratar arquivos nas requisições*/
app.use(express.urlencoded({ extended: true}));

app.use(require('./routes'));

app.use('/files', express.static(path.resolve(__dirname, '..', 'temp')));

server.listen(process.env.PORT || 3100);
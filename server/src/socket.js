const moment = require('moment');
const { addUser, removeUser, users } = require('./users');

function setUpSocketIO(io) {
    io.on('connection', function(socket) {
        socket.on('join', (username) => {
            const { error, user } = addUser(
                { id: socket.id, name: username });
            if (error) return callback(error);
            console.log(users);
            socket.broadcast.emit('user_joined', {
                username
            })
            const names = users.map(user => user.name);
    
            io.emit('user_list_update', names);
        });
    
        socket.on('SEND_MESSAGE', function(data) {
            io.emit('MESSAGE', {
                ...data,
                timestamp: moment().format('h:mm a'),
            })
        });
        socket.on('typing', function(data) {
            socket.broadcast.emit('userTyping', {
                ...data
            });
        })
       
        socket.on('disconnect', function() {
            const removedUser = removeUser(socket.id);
            if (removedUser) {
                socket.broadcast.emit("userLeft", {
                    username: removedUser.name
                });
                const names = users.map(user => user.name);
    
                io.emit('user_list_update', names);
            }
        });
    })

}

module.exports = { setUpSocketIO };
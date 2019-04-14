var trading = require('../controller/TradeController');

exports.ioOperate = function(io) {
   io.on('connection', socket => {
      console.log(`socket id ${socket.id}`);

      socket.on('get-room', function(room) {
         socket.join(room.room);
         console.log(`join room ${room.room}`);
         console.log(`socket id ${socket.id}`);
         trading.upsertTrade(room, io);
      })

      socket.on('send-msg', function(data) {
         console.log('msg: ' + data);
         trading.sendMessage(data);
         //io.to(data.room).emit('send-msg', data);
         io.to(socket.id).emit('send-msg', data);
      });

      socket.on('send-req', function(data) {
         io.emit('send-req', data);
      })

      socket.on('add-item', function(data) {
         trading.addItem(data, io);
      })

      socket.on('remove-item', function(data) {
         trading.removeItem(data, io);
      })

      socket.on('reset-trade', function(data) {
         trading.resetTrade(data, io);
      })

      socket.on('confirm-trade', function(data) {
         trading.confirmTrade(data, io);
      })

      socket.on('unconfirm-trade', function(data) {
         trading.unconfirmTrade(data, io);
      })
   })
}


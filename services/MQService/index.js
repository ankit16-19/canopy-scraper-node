const amqp = require('amqplib/callback_api');
const CONN_URL = process.env.MQCONN;

let channel = null;
amqp.connect(CONN_URL, function (err, conn) {
   conn.createChannel(function (err, rchannel) {
       if(err)
            throw new Error("error: ", err)
        channel = rchannel;
   });
});


module.exports = channel


process.on('exit', (code) => {
    channel.close();
   console.log(`Closing rabbitmq channel`);
});
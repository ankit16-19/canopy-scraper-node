const fee_extract = require("../functions/fee")

const amqp = require('amqplib/callback_api');
const CONN_URL = process.env.MQCONN;

let channel = null;
amqp.connect(CONN_URL, function (err, conn) {
	if(err){
		throw new Error("error(In creating Connection): ", err)
	}
   conn.createChannel(function (err, rchannel) {
       if(err){
		throw new Error("error(In creating channel): ", err)
	   }
		channel = rchannel;
		// create queue
		channel.assertQueue(process.env.FEE, {
			durable: true
		});
		channel.consume(process.env.FEE, async function (msg) {
			
			let data = JSON.parse(msg.content);
			try{

				await fee_extract.scraper(data.uid,data.pwd,fee_extract.data_writer)	
				channel.ack(msg);
			}catch (err){
				channel.nack(msg);
				console.log(err)
			}
		  },
		  { noAck: false }
		);
		

   });
});





process.on('exit', (code) => {
	channel.close();
   console.log(`Closing rabbitmq channel`);
});










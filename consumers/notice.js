const Notice = require('../functions/notice')



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
		//Create queue
		channel.assertQueue(process.env.NOTICE, {
			durable: true
		});
		channel.consume(process.env.NOTICE, async function (msg) {
			
			let data = JSON.parse(msg.content);			
			console.log(data)
			try{

				let data2 = await Notice.scraper(data.uid,data.pwd)
				if(data2){
					await Notice.data_writer(data2)	
					channel.ack(msg);
				}else{
					channel.nack(msg);
					console.log("no data in scraping")
				}

				
			}catch (err){
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











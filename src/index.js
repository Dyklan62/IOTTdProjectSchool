const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://0.0.0.0:1883');
const topic = 'topic/Hello';
var message;
var pseudo;


client.on('connect', async () => {
    console.log(`Is client connected: ${client.connected}`);    
    if (client.connected === true) {
        // HANDLE USER INPUT
        pseudo = await redLineResponse('queo est votre pseudo ?');
        message = `> ${pseudo} : Bonjour, je suis ${pseudo}`
        console.log(`${message}, topic: ${topic}`); 
        // publish message        
        client.publish(topic, message);
    }

    // subscribe to a topic
    client.subscribe(topic);
});

// receive a message from the subscribed topic
client.on('message',(topic, message) => {
  if(!message.toString().includes(pseudo)){
    console.log(`${message}, topic: ${topic}`); 
  }
});

// error handling
client.on('error',(error) => {
    console.error(error);
    process.exit(1);
});

const redLineResponse = (question) => {
	const readline = require('readline').createInterface({
		input: process.stdin,
		output: process.stdout
	});
	return new Promise(resolve => {
		readline.question(question, (answer) => {
			readline.close();
			resolve(answer);
		})
	})
}
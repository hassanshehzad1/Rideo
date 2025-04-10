// rideo-user-service/services/rabbit.js
import amqp from "amqplib";

let connection, channel;

export async function connectToRabbit() {
  const RABBIT_URL = process.env.RABBIT_URL;
  console.log('RABBIT_URL', RABBIT_URL); // Yeh ab undefined nahi hoga
  if (!RABBIT_URL) throw new Error("RABBIT_URL nahi mila!");
  connection = await amqp.connect(RABBIT_URL);
  channel = await connection.createChannel();
  console.log("Connected to RabbitMQ");
}

export async function subscribe(queueName, callback) {
  if (!channel) await connectToRabbit();
  await channel.assertQueue(queueName);
  channel.consume(queueName, (message) => {
    callback(message.content.toString());
    channel.ack(message);
  });
}

export async function publishToQueue(queueName, message) {
  if (!channel) await connectToRabbit();
  await channel.assertQueue(queueName);
  channel.sendToQueue(queueName, Buffer.from(message));
}
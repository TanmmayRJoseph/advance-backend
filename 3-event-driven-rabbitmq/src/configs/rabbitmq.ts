import amqp from "amqplib";

let channel: amqp.Channel; // Declare a variable to hold the channel

export async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672"); // Connect to RabbitMQ server
    channel = await connection.createChannel(); // Create a channel

    await channel.assertQueue("orders"); // Create a queue

    console.log("RabbitMQ connected");
  } catch (error) {
    console.log("Error connecting to rabbitmq");
  }
}

export function getChannel() {
  if (!channel) {
    throw new Error(
      "RabbitMQ channel is not initialized. Call connectRabbitMQ() first.",
    );
  }
  return channel;
}

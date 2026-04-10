import amqp from "amqplib";

let channel: any;
let connection: any;

export const consumerService = async () => {
  try {
    connection = await amqp.connect("amqp://rabbitmq_node");

    connection.on("close", () => {
      console.error("❌ RabbitMQ connection closed");
    });

    connection.on("error", (err: any) => {
      console.error("❌ RabbitMQ error:", err.message);
    });

    channel = await connection.createChannel();

    // Shared queue (important)
    await channel.assertQueue("notifications", { durable: true });

    console.log("✅ Notification Service is listening to messages......");

    // logging the messages
    channel.consume("notifications", (msg: any) => {
      if (!msg) return;
      const message = JSON.parse(msg.content.toString());
      console.log("Message type: ", message.type);
      console.log("Message: ", message);

      // ack the channel
      channel.ack(msg);
    });
  } catch (error: any) {
    console.log("❌ Error connecting to RabbitMQ:", error.message);
  }
};

consumerService();

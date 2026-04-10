import amqp from "amqplib";

let channel: any;
let connection: any;

export const connectRabbitMQ = async (retries = 5, delay = 3000) => {
  while (retries) {
    try {
      connection = await amqp.connect("amqp://rabbitmq_node");

      connection.on("close", () => {
        console.error("❌ RabbitMQ connection closed");
      });

      connection.on("error", (err :any) => {
        console.error("❌ RabbitMQ error:", err.message);
      });

      channel = await connection.createChannel();

      // Shared queue (important)
      await channel.assertQueue("notifications", { durable: true });

      console.log("✅ RabbitMQ connected");

      return channel;
    } catch (error: any) {
      console.log("❌ Error connecting to RabbitMQ:", error.message);
      retries--;

      console.log(
        `⏳ Retrying in ${delay / 1000}s... Attempts left: ${retries}`,
      );

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error("❌ Failed to connect to RabbitMQ after retries");
};

export const getChannel = () => {
  if (!channel) {
    throw new Error("❌ RabbitMQ channel not initialized");
  }
  return channel;
};

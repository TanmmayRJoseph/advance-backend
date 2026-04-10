import amqp from "amqplib";

let channel: any;

export const connectRabbitMQ = async () => {
  const connection = await amqp.connect("amqp://rabbitmq");
  channel = await connection.createChannel();

  console.log("✅ RabbitMQ connected");

  return channel;
};

export const getChannel = () => channel;
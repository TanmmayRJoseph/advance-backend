import { getChannel } from "../../configs/rabbitmq";

export async function publishOrderCreated(order: any) {
  const channel = getChannel(); // Get the RabbitMQ channel

  //   send the order data to the "orders" queue
  channel.sendToQueue("orders", Buffer.from(JSON.stringify(order)));

  console.log("Order published to RabbitMQ:", order);
}

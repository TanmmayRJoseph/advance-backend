import { getChannel } from "../../configs/rabbitmq";
import { sendEmail } from "../../services/email.service";

export async function startOrderConsumer() {
  const channel = getChannel();

  channel.consume("orders", async (msg:any) => {
    if (!msg) return;

    const order = JSON.parse(msg.content.toString());
    console.log("Order received from RabbitMQ:", order);

    try {
      await sendEmail(order);

      console.log(`Email sent to user for product ${order.productId}`);

      // ✅ ACK ONLY HERE (ON SUCCESS)
      channel.ack(msg);
    } catch (err) {
      console.log("Error:", err);

      // ❌ Don't lose message → retry
      channel.nack(msg, false, true);
    }
  });
}
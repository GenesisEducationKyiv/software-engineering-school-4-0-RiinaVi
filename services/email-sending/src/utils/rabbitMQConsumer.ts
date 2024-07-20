import amqplib from 'amqplib';
import sendRateToAllEmails from '../jobs/sendRateToAllEmails';

const rabbitMQConsumer = async (queue: string): Promise<void> => {
  const connection = await amqplib.connect(
    `amqp://${process.env.SERVER_IP ?? 'localhost'}`,
  );
  const channel = await connection.createChannel();
  await channel.assertQueue(queue);

  await channel.consume(queue, async (message) => {
    if (message !== null) {
      console.log('Received:', message.content.toString());
      channel.ack(message);
      await sendRateToAllEmails();
    } else {
      console.log('Consumer cancelled by server');
    }
  });
};

export default rabbitMQConsumer;

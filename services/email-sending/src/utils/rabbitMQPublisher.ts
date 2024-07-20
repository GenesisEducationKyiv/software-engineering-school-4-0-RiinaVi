import amqplib from 'amqplib';
import { randomUUID } from 'crypto';

const rabbitMQPublisher = async (queue: string): Promise<void> => {
  const connection = await amqplib.connect(
    `amqp://${process.env.SERVER_IP ?? 'localhost'}`,
  );
  const channel = await connection.createChannel();
  await channel.assertQueue(queue);

  const message = {
    eventId: randomUUID(),
    eventType: 'EmailScheduled',
    timeStamp: +new Date(),
  };

  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
};

export default rabbitMQPublisher;

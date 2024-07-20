import amqplib, { Connection, ServerProperties } from 'amqplib';
import { randomUUID } from 'crypto';

import rabbitMQConsumer from '../../utils/rabbitMQConsumer';
import { QUEUE } from '../../app';

describe('rabbitMQConsumer', () => {
  test('should be called', async () => {
    const message = {
      content: Buffer.from(
        JSON.stringify({
          eventId: randomUUID(),
          eventType: 'EmailScheduled',
          timeStamp: +new Date(),
        }),
      ),
    };
    const channel = {
      assertQueue: jest.fn(),
      ack: jest.fn(),
      consume: jest.fn().mockImplementation((queue, callback) => {
        callback(message);
      }),
    };
    const connection: Connection = {
      createChannel: jest.fn().mockImplementation(() => {
        return Promise.resolve(channel);
      }),
      close: jest.fn(),
      createConfirmChannel: jest.fn(),
      connection: {
        serverProperties: {} as unknown as ServerProperties,
      },
      addListener: jest.fn(),
      on: jest.fn(),
      once: jest.fn(),
      removeListener: jest.fn(),
      off: jest.fn(),
      removeAllListeners: jest.fn(),
      setMaxListeners: jest.fn(),
      getMaxListeners: jest.fn(),
      rawListeners: jest.fn(),
      emit: jest.fn(),
      prependListener: jest.fn(),
      prependOnceListener: jest.fn(),
      eventNames: jest.fn(),
      listenerCount: jest.fn(),
      listeners: jest.fn(),
    };

    jest.spyOn(amqplib, 'connect').mockImplementation(() => {
      return Promise.resolve(connection);
    });

    await rabbitMQConsumer(QUEUE);
    expect(amqplib.connect).toBeCalledWith(
      `amqp://${process.env.SERVER_IP ?? 'localhost'}`,
    );
    expect(connection.createChannel).toBeCalled();
    expect(channel.assertQueue).toBeCalledWith(QUEUE);
    expect(channel.consume).toBeCalledWith(QUEUE, expect.any(Function));
  });
});

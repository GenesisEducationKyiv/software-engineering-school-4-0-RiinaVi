import { app, main } from './app';

const { PORT } = process.env;

main().catch((err) => {
  console.error(err);
});

app.listen(PORT ?? 8000, () => {
  console.log(
    `server started at http://${process.env.SERVER_IP ?? 'localhost'}:${
      PORT ?? 8000
    }`,
  );
});

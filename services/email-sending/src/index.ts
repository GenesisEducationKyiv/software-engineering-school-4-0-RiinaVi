import { app } from './app';

const { PORT, SERVER_IP } = process.env;

app.listen(PORT ?? 8030, () => {
  console.log(
    `server started at http://${SERVER_IP ?? 'localhost'}:${PORT ?? 8030}`,
  );
});

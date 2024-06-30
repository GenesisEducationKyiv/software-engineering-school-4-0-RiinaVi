import { AbstractTransportLayer } from './AbstractTransportLayer';

class FetchTransportLayer extends AbstractTransportLayer {
  async get<T>(url: string): Promise<T> {
    const rawResponse = await fetch(url);
    return (await rawResponse.json()) as T;
  }
}

export default new FetchTransportLayer();

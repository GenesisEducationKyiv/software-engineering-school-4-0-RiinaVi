import axios from 'axios';

import { AbstractTransportLayer } from './AbstractTransportLayer';

class AxiosTransportLayer extends AbstractTransportLayer {
  async get<T>(url: string): Promise<T> {
    const response = (await axios.get<T>(url)) as { data: T };
    return response.data;
  }
}

export default new AxiosTransportLayer();

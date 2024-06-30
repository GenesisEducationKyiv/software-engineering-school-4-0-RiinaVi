import { AbstractTransportLayer } from '../transportLayer/AbstractTransportLayer';

export interface RateSourceResponse {
  rate?: number;
  code: number;
  errorMessage?: string;
}

export abstract class RateSourceService {
  protected constructor(protected readonly url: string) {}

  get getUrl(): string {
    return this.url;
  }

  abstract retrieve(
    transportLayer: AbstractTransportLayer,
  ): Promise<RateSourceResponse>;
}

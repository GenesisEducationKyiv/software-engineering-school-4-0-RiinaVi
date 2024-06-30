import { AbstractTransportLayer } from '../transportLayer/AbstractTransportLayer';

export interface RateSourceResponse {
  rate?: number;
  code: number;
  errorMessage?: string;
}

export abstract class RateSourceService {
  protected constructor(
    protected readonly url: string,
    protected readonly transportLayer: AbstractTransportLayer,
  ) {}

  abstract retrieve(): Promise<RateSourceResponse>;
}

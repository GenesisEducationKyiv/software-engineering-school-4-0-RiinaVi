import { AbstractTransportLayer } from '../transportLayer/AbstractTransportLayer';

export abstract class RateSourceService {
  protected constructor(
    protected readonly url: string,
    protected readonly transportLayer: AbstractTransportLayer,
  ) {}

  abstract retrieve(): Promise<number | undefined>;
}

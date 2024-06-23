export abstract class RateSourceService {
  protected constructor(protected readonly url: string) {}

  abstract retrieve(): Promise<number | undefined>;
}

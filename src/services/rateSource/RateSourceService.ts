export interface RateSourceResponse {
  rate?: number;
  code: number;
  errorMessage?: string;
}

export abstract class RateSourceService {
  protected constructor(private readonly url: string) {}

  get getUrl(): string {
    return this.url;
  }

  abstract retrieve(): Promise<RateSourceResponse>;
}

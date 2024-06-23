export interface RateSourceResponse {
  rate?: number;
  code: number;
  errorMessage?: string;
}

export abstract class RateSourceService {
  protected constructor(protected readonly url: string) {}

  abstract retrieve(): Promise<RateSourceResponse>;
}

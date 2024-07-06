export abstract class AbstractTransportLayer {
  abstract get<T>(url: string): Promise<T>;
}

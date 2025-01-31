import type { ZodSchema } from 'zod';

export class ApiClient {
  static async post<Props, ReturnType>(
    endpoint: string,
    props: Props,
    parser: ZodSchema
  ): Promise<ReturnType | undefined> {
    try {
      const req = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(props),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const res = await req.json();
      const parsed = parser.safeParse(res);

      if (parsed.success) {
        return parsed.data;
      }

      return undefined;
    } catch (e) {
      return undefined;
    }
  }

  static async get<ReturnType>(
    endpoint: string,
    parser: ZodSchema
  ): Promise<ReturnType | undefined> {
    try {
      const req = await fetch(endpoint, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const res = await req.json();
      const parsed = parser.safeParse(res);

      if (parsed.success) {
        return parsed.data;
      }

      return undefined;
    } catch (e) {
      return undefined;
    }
  }
}

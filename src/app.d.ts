// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    interface Locals {
      user_id?: string;
    }

    interface PageData {
      user_id?: string;
    }

    interface Platform {
      env: {
        STYTCH_PROJECT_ID: string;
        STYTCH_SECRET: string;
      };
      cf: CfProperties;
      ctx: ExecutionContext;
    }
  }
}

export {};

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
        ADMIN_USER_ID: string;
        ANTHROPIC_API_KEY: string;
        STYTCH_PROJECT_ID: string;
        STYTCH_SECRET: string;
        SUPABASE_PROJECT_URL: string;
        SUPABASE_PUBLIC_ANON_KEY: string;
      };
      cf: CfProperties;
      ctx: ExecutionContext;
    }
  }
}

export {};

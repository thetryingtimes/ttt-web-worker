import type { UserBallot, VoteMessage } from '$lib/api/ballots/ballot';
import type { SiteStats } from '$lib/api/kv/stats';

declare global {
  namespace App {
    interface Locals {
      user_id?: string;
    }

    interface PageData {
      user_id?: string;
      user_ballots: UserBallot[];
      stats?: SiteStats;
    }

    interface Platform {
      env: {
        ADMIN_USER_ID: string;
        ANTHROPIC_API_KEY: string;
        GOOGLE_API_KEY: string;
        STYTCH_PROJECT_ID: string;
        STYTCH_SECRET: string;
        SUPABASE_PROJECT_URL: string;
        SUPABASE_PUBLIC_ANON_KEY: string;
        ZAP_SECRET: string;

        ARTICLES: KVNamespace;
        TABULATOR: Queue<VoteMessage>;
        LOGS: R2Bucket;
      };
      cf: CfProperties;
      ctx: ExecutionContext;
    }
  }
}

export {};

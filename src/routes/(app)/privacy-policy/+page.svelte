<script lang="ts">
  import Article from '$lib/components/articles/Article.svelte';
</script>

<svelte:head>
  <title>Privacy Policy | The Trying Times</title>
</svelte:head>

<Article>
  <h1>Privacy Policy</h1>
  <p>
    The Trying Times ("TTT", "we") is committed to protecting the privacy of our
    readers & platform users. This policy explains how we handle your data:
  </p>
  <h2>Information We Collect</h2>
  <ul>
    <li>Phone number (for account verification via Stytch.com)</li>
    <li>Location data (county and state only) when you vote</li>
    <li>Voting history (which bills you've supported or opposed)</li>
  </ul>
  <h2>How We Use Your Data</h2>
  <ul>
    <li>
      <strong>Phone number:</strong> Used solely for verification and preventing
      duplicate accounts
    </li>
    <li>
      <strong>Location data:</strong> Used to show regional voting patterns at
      the county and state level.
      <strong>Your exact location is not stored.</strong>
    </li>
    <li>
      <strong>Voting data:</strong> Used to display aggregate public opinion on legislation.
    </li>
  </ul>
  <h2>Data Security</h2>
  <ul>
    <li>
      Account security and your phone number is managed by Stytch.com and
      protected by SOC 2 Type II: an auditing standard that assesses a company's
      security controls over time.
    </li>
    <li>
      We do not and <em class="font-bold">will never</em> sell your personal information
      to third parties or use it for commercial purposes.
    </li>
    <li>
      We do not store or collect any information beyond what's listed above.
    </li>
  </ul>
  <h2>Third-Party Services</h2>
  <ul>
    <li>We use Stytch.com for account verification</li>
    <li>
      We use Cloudflare Workers for website security, performance, and logging
    </li>
    <li>We use GCP for reverse geocoding, discarding precise location data</li>
    <li>These services have their own privacy policies</li>
  </ul>
  <h2>Your Rights</h2>
  <ul>
    <li>You can delete your account at any time</li>
    <li>You can request your voting history</li>
    <li>
      Contact us at <a
        href="mailto:thetryingtimes@proton.me?subject=Privacy+Policy+inquiry"
        >thetryingtimes@proton.me</a
      > for any privacy concerns.
    </li>
  </ul>
  <h3>Version history</h3>
  <ul>
    <li>
      <strong>02/07/2025:</strong> Further clarified information we collect, where
      it's stored, and how it's processed
    </li>
    <li><strong>01/29/2025:</strong> Initial version published</li>
  </ul>
</Article>

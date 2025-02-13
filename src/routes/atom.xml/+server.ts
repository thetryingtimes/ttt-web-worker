import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { SupabaseClient } from '$lib/server/utils/supabase';
import showdown from 'showdown';

export const GET: RequestHandler = async ({ platform }) => {
  if (!platform) error(404);

  const supa = new SupabaseClient(platform);
  const entries = await supa.rssListArticles();

  const doc = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>The Trying Times — Articles</title>
  <subtitle>News you can act on</subtitle>
  <link rel="self" type="application/atom+xml" href="https://thetryingtimes.com/atom.xml"/>
  <link rel="alternate" type="text/html" href="https://thetryingtimes.com"/>
  <id>https://thetryingtimes.com/atom.xml</id>
  <updated>${entries[0].created_at}</updated>
  <author>
    <name>The Trying Times</name>
    <email>thetryingtimes@proton.me</email>
  </author>
  <icon>https://thetryingtimes.com/ttt-icon.png</icon>
  ${entries
    .map(
      (entry) => `<entry>
    <title>${entry.content.title}</title>
    <link rel="alternate" type="text/html" href="https://thetryingtimes.com/${entry.external_id}"/>
    <link rel="related" type="text/html" href="https://thetryingtimes.com/${entry.external_id}"/>
    <id>https://thetryingtimes.com/${entry.external_id}</id>
    <updated>${entry.created_at}</updated>
    <author>
      <name>The Trying Times</name>
    </author>
    <category term="${entry.category_id}"/>
    <summary type="text"><![CDATA[${entry.content.blurb}]]></summary>
    <content type="html" xml:base="https://thetryingtimes.com" xml:lang="en"><![CDATA[${new showdown.Converter().makeHtml(entry.content.sections.filter((s) => s.type === 'section')[0].content)}]]></content>
  </entry>
  `
    )
    .join('')}
</feed>`;

  return new Response(doc, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, maxage=900'
    }
  });
};
/**


<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
<title>Daring Fireball</title>
<subtitle>By John Gruber</subtitle>
<link rel="alternate" type="text/html" href="https://daringfireball.net/" />
<link rel="self" type="application/atom+xml" href="https://daringfireball.net/feeds/main" />
<id>https://daringfireball.net/feeds/main</id>
<updated>2025-02-13T00:04:39Z</updated>
<rights>Copyright © 2025, John Gruber</rights>
<entry>
	<title>How WikiTok Was Created</title>
	<link rel="alternate" type="text/html" href="https://arstechnica.com/gadgets/2025/02/new-wikitok-web-app-allows-infinite-tiktok-style-scroll-of-wikipedia/" />
	<link rel="shorturl" type="text/html" href="http://df4.us/w2p" />
	<link rel="related" type="text/html" href="https://daringfireball.net/linked/2025/02/12/how-wikitok-was-created" />
	<id>tag:daringfireball.net,2025:/linked//6.41569</id>
	<published>2025-02-12T22:17:28Z</published>
	<updated>2025-02-12T22:17:29Z</updated>
	<author>
		<name>John Gruber</name>
		<uri>http://daringfireball.net/</uri>
	</author>
	<content type="html" xml:base="https://daringfireball.net/linked/" xml:lang="en"><![CDATA[
]]></content>
  </entry>
</feed>

 */

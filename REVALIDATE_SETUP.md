On-demand revalidation setup

This app supports ISR (incremental static regeneration) for key pages and an on-demand revalidation endpoint so Sanity Studio can trigger immediate re-renders when content is published.

1) Environment variable

- Set `REVALIDATE_SECRET` (or `NEXT_PUBLIC_REVALIDATE_SECRET`) in your Vercel environment variables to a strong secret.

2) Endpoint

- POST to `/api/revalidate` with JSON body:
  {
    "secret": "<your secret>",
    "paths": ["/nl", "/en", "/en/blog/your-slug"]
  }

- The endpoint will call Next's `revalidatePath` for each path, updating the prerendered pages.

3) Sanity webhook

- In Sanity Studio (or the project's Sanity dashboard), create a webhook that triggers on `publish` (and optionally `unpublish`/`create`) events.
- Configure the webhook URL to call your deployment's `/api/revalidate` endpoint and include the secret in the body or header `x-revalidate-secret`.

Example webhook payload (JSON):
  {
    "secret": "<your secret>",
    "paths": ["/nl", "/en"]
  }

Tip: If you want to only revalidate specific pages (e.g., a blog post), have the webhook payload include the path for that slug. The webhook can be configured to include document data (like slug) and you can transform it into the correct path.

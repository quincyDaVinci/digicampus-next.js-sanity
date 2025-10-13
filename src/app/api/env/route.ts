export async function GET() {
  return new Response(JSON.stringify({
    pid: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    ds: process.env.NEXT_PUBLIC_SANITY_DATASET
  }), { headers: { 'content-type': 'application/json' }});
}

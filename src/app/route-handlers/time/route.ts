export const dynamic = "force-static";
export const revalidate = 10;


//export const dynamic = "force-static"; This tells Next.js to statically generate the page or API route at build time.

/**
 * npm run build     npm start
 * 
 * The first request builds the response and caches it.
 * For the next 10 seconds, anyone who hits that endpoint gets the same cached time.
 * After 10 seconds, a new version is built in the background, and that becomes the new cached version for the next 10 seconds.
 */

export async function GET() {
  return Response.json({ time: new Date().toLocaleTimeString() });
}
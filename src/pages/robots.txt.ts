import type { APIRoute } from "astro";
import { SITE } from "@/shared/config/site";

const robotsTxt = `
User-agent: *
Allow: /
Sitemap: ${SITE.url}/sitemap-index.xml
`.trim();

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};

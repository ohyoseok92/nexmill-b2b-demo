import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots { return { rules: [{ userAgent: "*", allow: ["/", "/about", "/products", "/contact"], disallow: "/admin" }], sitemap: "https://nexmill-industrial-demo.oh6428.chatgpt.site/sitemap.xml" }; }

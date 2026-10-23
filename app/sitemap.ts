import type { MetadataRoute } from "next";
import { products } from "@/lib/site-data";

const base = "https://nexmill-industrial-demo.oh6428.chatgpt.site";
export default function sitemap(): MetadataRoute.Sitemap { return ["/", "/about", "/products", "/contact", ...products.map((product) => `/products/${product.slug}`)].map((path) => ({ url: `${base}${path}`, changeFrequency: "monthly" as const, priority: path === "/" ? 1 : 0.7 })); }

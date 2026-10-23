import Link from "next/link";
import type { Metadata } from "next";
import { ProductVisual } from "@/components/product-visual";
import { products } from "@/lib/site-data";

export const metadata: Metadata = { title: "제품", description: "NEXMILL 가상 산업용 부품 카탈로그" };
export default function ProductsPage() { return <main><section className="page-hero"><div className="container"><p className="eyebrow">PRODUCTS / 01—03</p><h1>필요한 움직임을<br />제품으로 살펴보세요.</h1><p>세 제품은 가상 기업의 시연용 항목입니다. 실제 규격이나 성능 인증을 뜻하지 않습니다.</p></div></section><section className="subsection"><div className="container product-list">{products.map((product) => <Link href={`/products/${product.slug}`} className="product-row" key={product.slug}><div className="product-row-art"><ProductVisual type={product.visual} /></div><div className="product-row-copy"><small>{product.code} / {product.category}</small><h2>{product.name}</h2><p>{product.short}</p></div><span className="product-row-arrow" aria-hidden="true">↗</span></Link>)}</div></section></main>; }

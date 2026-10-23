import type { Metadata } from "next";
import { InquiryForm } from "@/components/inquiry-form";
import { company, getProduct } from "@/lib/site-data";

export const metadata: Metadata = { title: "문의 접수 시연", description: "가상 정보로 제품 문의 접수와 확인 흐름을 체험하세요." };
export default async function ContactPage({ searchParams }: { searchParams: Promise<{ product?: string }> }) { const query = await searchParams; const initialProduct = getProduct(query.product ?? "")?.slug ?? ""; return <main><section className="page-hero"><div className="container"><p className="eyebrow">CONTACT / DEMO</p><h1>필요한 조건을<br />남겨보세요.</h1><p>이 화면은 문의 접수 흐름을 시험하는 포트폴리오 데모입니다. 실명과 실제 연락처를 입력하지 마세요.</p></div></section><div className="container contact-layout"><aside className="contact-aside"><h2>무엇을 확인하나요?</h2><p>제품, 수량, 요청 유형을 고르고 가상 회사 정보를 넣습니다. 서버는 입력을 검사한 뒤 데모 데이터베이스에 저장하고 접수번호를 돌려줍니다.</p><div className="contact-note"><strong>가상 기업 안내</strong><p>{company.demoNotice}</p><p>데모 전용 이메일은 <code>name@example.com</code> 형식으로 입력하세요.</p></div></aside><div className="contact-card"><h2>문의 접수 체험</h2><p>모든 입력은 가상 정보만 사용하세요. 실제 담당자에게 발송되지 않습니다.</p><InquiryForm initialProduct={initialProduct} /></div></div></main>; }

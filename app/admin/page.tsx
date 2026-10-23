import Link from "next/link";
import { env } from "cloudflare:workers";
import { desc } from "drizzle-orm";
import { getChatGPTUser, chatGPTSignInPath } from "@/app/chatgpt-auth";
import { getDb } from "@/db";
import { inquiries } from "@/db/schema";
import { getProduct } from "@/lib/site-data";

export const dynamic = "force-dynamic";
const formatKst = (iso: string) => `${new Intl.DateTimeFormat("ko-KR", { timeZone: "Asia/Seoul", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date(iso))} KST`;
export default async function AdminPage() {
  const user = await getChatGPTUser();
  if (!user) return <main className="container subsection"><h1>제작자 확인 화면</h1><p>저장된 데모 문의는 제작자만 확인할 수 있습니다.</p><Link className="button button-dark" href={chatGPTSignInPath("/admin")} target="_top">ChatGPT로 로그인</Link></main>;
  if (!env.ADMIN_USER_ID || user.userId !== env.ADMIN_USER_ID) return <main className="container subsection"><h1>접근 권한이 없습니다.</h1><p>이 화면은 사이트 제작자 전용입니다.</p></main>;
  let rows: typeof inquiries.$inferSelect[] = [];
  let unavailable = false;
  try { rows = await getDb().select().from(inquiries).orderBy(desc(inquiries.createdAt)).limit(50); } catch { unavailable = true; }
  return <main className="container subsection"><p className="eyebrow">ADMIN / DEMO INQUIRIES</p><h1>시연용 문의함</h1><p className="body-copy">최근 접수 50건을 표시합니다. 실제 고객 연락이나 견적 처리는 하지 않습니다.</p>{unavailable?<p role="alert">저장소를 읽지 못했습니다.</p>:rows.length===0?<p>아직 저장된 시연 문의가 없습니다.</p>:<div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>접수일</th><th>번호</th><th>가상 회사 / 담당</th><th>제품 / 수량</th><th>요청</th></tr></thead><tbody>{rows.map(row=><tr key={row.id}><td>{formatKst(row.createdAt)}</td><td>{row.id}</td><td>{row.company}<br />{row.contactName}<br />{row.email}</td><td>{getProduct(row.product)?.name??row.product}<br />{row.quantity.toLocaleString()}</td><td>{row.requestType}<br />{row.message}</td></tr>)}</tbody></table></div>}</main>;
}

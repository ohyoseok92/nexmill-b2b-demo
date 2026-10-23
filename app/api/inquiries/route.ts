import { and, eq, gte, lt } from "drizzle-orm";
import { getDb } from "@/db";
import { inquiries } from "@/db/schema";
import { validateInquiry } from "@/lib/inquiries";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return Response.json({ error: "접수 경로를 확인해 주세요." }, { status: 403 });
  if (Number(request.headers.get("content-length") ?? 0) > 4096) return Response.json({ error: "입력 내용이 너무 깁니다." }, { status: 413 });
  let input: unknown;
  try { input = await request.json(); } catch { return Response.json({ error: "입력 형식을 확인해 주세요." }, { status: 400 }); }
  const validated = validateInquiry(input);
  if (!validated.ok) return Response.json({ error: validated.error }, { status: 400 });
  try {
    const db = getDb();
    await db.delete(inquiries).where(lt(inquiries.createdAt, new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()));
    const cutoff = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const recent = await db.select({ id: inquiries.id }).from(inquiries).where(and(eq(inquiries.email, validated.value.email), gte(inquiries.createdAt, cutoff))).limit(3);
    if (recent.length >= 3) return Response.json({ error: "같은 데모 이메일은 한 시간에 세 번까지 접수할 수 있습니다." }, { status: 429 });
    const id = `NM-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    await db.insert(inquiries).values({ id, ...validated.value, createdAt: new Date().toISOString() });
    return Response.json({ id, status: "stored-demo-only" }, { status: 201, headers: { "cache-control": "no-store" } });
  } catch { return Response.json({ error: "데모 저장소에 연결하지 못했습니다." }, { status: 503 }); }
}

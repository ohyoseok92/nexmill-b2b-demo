import { products } from "./site-data";

export const requestTypes = ["drawing-review", "spec-consultation", "sample-request"] as const;
export type Inquiry = { company: string; contactName: string; email: string; product: string; quantity: number; requestType: (typeof requestTypes)[number]; message: string };
type Validation = { ok: true; value: Inquiry } | { ok: false; error: string };

function textField(value: unknown, max: number) { return typeof value === "string" && value.trim().length <= max ? value.trim() : ""; }
export function validateInquiry(input: unknown): Validation {
  if (!input || typeof input !== "object") return { ok: false, error: "입력 형식을 확인해 주세요." };
  const data = input as Record<string, unknown>;
  if (data.website) return { ok: false, error: "접수할 수 없습니다." };
  if (data.demoConsent !== "yes") return { ok: false, error: "시연용 정보 사용 안내에 동의해 주세요." };
  const company = textField(data.company, 60);
  const contactName = textField(data.contactName, 40);
  const email = textField(data.email, 80).toLowerCase();
  const product = textField(data.product, 60);
  const requestType = textField(data.requestType, 50);
  const message = textField(data.message ?? "", 300);
  const quantity = Number(data.quantity);
  if (company.length < 2 || contactName.length < 2) return { ok: false, error: "가상 회사명과 담당자명을 입력해 주세요." };
  if (!/^[a-z0-9._%+-]+@example\.(com|org|net)$/.test(email)) return { ok: false, error: "데모 이메일은 example.com·example.org·example.net만 사용할 수 있습니다." };
  if (!products.some((item) => item.slug === product)) return { ok: false, error: "제품을 다시 선택해 주세요." };
  if (!Number.isSafeInteger(quantity) || quantity < 1 || quantity > 100000) return { ok: false, error: "수량은 1부터 100000 사이의 정수로 입력해 주세요." };
  if (!requestTypes.some((item) => item === requestType)) return { ok: false, error: "요청 유형을 다시 선택해 주세요." };
  if (/@|(?:\+?\d[\d\s.-]{7,}\d)/.test(message)) return { ok: false, error: "추가 조건에 실제 연락처를 넣지 마세요." };
  return { ok: true, value: { company, contactName, email, product, quantity, requestType: requestType as Inquiry["requestType"], message } };
}

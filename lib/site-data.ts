export const company = {
  name: "NEXMILL",
  legalName: "넥스밀 정밀",
  tagline: "복잡한 요구를, 가공 가능한 답으로.",
  description: "산업 설비에 필요한 정밀 부품을 설계 조건에 맞춰 제안하는 가상 제조기업",
  email: "hello@nexmill.example",
  heroHeading: ["정밀함은", "작은 조건에서", "시작됩니다."],
  heroDescription: "설비의 움직임과 검사 과정을 이해하는 부품 설계. 요구 조건을 명확히 읽고, 다음 제작 단계를 함께 정리하는 제조 파트너를 그렸습니다.",
  demoNotice: "NEXMILL은 포트폴리오를 위한 가상 기업입니다. 제품·규격·문의 기록은 시연용이며 실제 판매나 견적을 진행하지 않습니다.",
} as const;

export const products = [
  {
    slug: "linear-guide-block", code: "NM-LG 100", name: "리니어 가이드 블록", category: "모션 부품",
    short: "반복 이동 구간에 쓰는 저마찰 가이드 구성품",
    description: "자동화 설비의 왕복 이동부를 상정한 시연용 제품입니다. 실제 적용에서는 하중, 속도, 설치 공간과 윤활 조건을 먼저 확인합니다.",
    specs: [["적용 예", "이송 축·검사 장비"], ["설계 검토", "하중·행정·정렬 오차"], ["제공 형태", "도면 검토 후 사양 협의"]],
    visual: "rail",
  },
  {
    slug: "precision-coupling", code: "NM-CP 240", name: "정밀 커플링", category: "동력 전달",
    short: "축 연결과 편심 보정을 함께 고려한 연결 부품",
    description: "모터와 구동축 사이의 연결 조건을 검토하는 시연용 제품입니다. 토크와 회전수, 축 직경, 허용 편심은 실제 설계 자료를 보고 결정해야 합니다.",
    specs: [["적용 예", "모터·펌프 연결"], ["설계 검토", "토크·회전수·축 직경"], ["제공 형태", "도면 검토 후 사양 협의"]],
    visual: "coupling",
  },
  {
    slug: "inspection-jig", code: "NM-JG 360", name: "검사 지그", category: "맞춤 제작",
    short: "반복 검사의 위치와 고정 방식을 정리한 지그",
    description: "부품의 검사 위치를 일정하게 잡는 시연용 지그입니다. 실제 제작에서는 측정 대상, 공차, 작업 순서와 안전 조건을 함께 확인합니다.",
    specs: [["적용 예", "치수 검사·조립 보조"], ["설계 검토", "측정 기준·공차·작업 동선"], ["제공 형태", "요구사항 확인 후 설계"]],
    visual: "jig",
  },
] as const;

export type Product = (typeof products)[number];
export function getProduct(slug: string) { return products.find((product) => product.slug === slug); }

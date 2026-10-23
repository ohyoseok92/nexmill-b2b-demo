# NEXMILL · B2B 제조기업 웹사이트 데모

가상 제조기업의 회사 소개, 제품 카탈로그, 문의 접수, 제작자 확인 화면을 담은 포트폴리오 프로젝트입니다. **실제 회사·제품·고객 사례가 아니며 실제 견적이나 판매를 진행하지 않습니다.**

- [공개 데모](https://nexmill-industrial-demo.oh6428.chatgpt.site/)
- [위시켓 포트폴리오](https://www.wishket.com/partners/p/ohyoseok92/portfolio/311600/)
- [위시켓 첨부용 PDF](portfolio/NEXMILL-Wishket-Portfolio.pdf)
- [포트폴리오 등록 문안](PORTFOLIO-WISHKET.md)

이 저장소에는 공개 시연의 소스와 가상 데이터로 만든 포트폴리오 자료가 있습니다. 호스팅 계정 설정과 제작자 계정 식별자는 포함하지 않았습니다. 시연 문의는 `example.com` 등의 가상 이메일만 받으며 실제 메일은 보내지 않습니다.

## 화면과 기능

| 경로 | 기능 |
| --- | --- |
| `/` | 회사와 제품군 소개, 제작 흐름, 문의 진입 |
| `/about` | 사업 소개와 요구 조건 검토 단계 |
| `/products` | 설정 파일에서 읽는 제품 목록 |
| `/products/[slug]` | 제품 설명·검토 항목·문의 연결 |
| `/contact` | 시연용 문의 입력, 검증, 접수번호 확인 |
| `/admin` | ChatGPT 로그인 후 사이트 소유자만 저장된 문의 확인 |

제품명·설명·규격표·시각화 유형과 브랜드 기본 정보는 [`lib/site-data.ts`](lib/site-data.ts)에서 바꿉니다. 회사별 소개 문단과 화면 구성은 `app/`의 해당 페이지에서 조정합니다. 제품 시각화는 실제 촬영 사진이 아닌 코드로 만든 개념도입니다.

문의 API는 허용된 제품·요청 유형, 수량과 입력 길이를 서버에서 다시 검사합니다. 실제 연락처 수집을 피하려고 `example.com`, `example.org`, `example.net` 이메일만 받습니다. 접수는 D1에 저장되며 같은 이메일은 한 시간에 세 건까지 허용합니다. 기록은 새 접수 시 30일이 지난 항목부터 정리합니다. 문의 이메일을 보내는 기능은 없습니다.

## 기술 구성

- Vinext, React, TypeScript, Cloudflare Workers
- Cloudflare D1 + Drizzle ORM: 시연 문의 저장
- ChatGPT 로그인 헤더와 서버의 `ADMIN_USER_ID` 대조: 제작자 문의함 접근 제어
- 제품 콘텐츠 설정 파일, 반응형 CSS, 서버 렌더링 메타데이터·사이트맵

`ADMIN_USER_ID`는 호스팅 환경 변수로 설정합니다. 공개 소스나 브라우저 코드에 넣지 않습니다. 로컬 로그인 검수에는 Git에서 제외된 `.dev.vars`를 사용합니다.

## 로컬 실행

Node.js 22.13 이상이 필요합니다.

```powershell
npm ci
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_lovely_mystique.sql
npm run dev
```

스키마를 바꾼 뒤에만 `npm run db:generate`로 새 마이그레이션을 만듭니다. 운영 환경은 Sites 버전 배포 시 마이그레이션을 적용합니다. 포트폴리오용 데모 문의는 `qa@example.com` 같은 가상 주소로만 시험하세요.

## 검증 기준

페이지 6개 경로와 제품 상세 3개, 모바일 내비게이션, 문의 입력 오류와 성공, 제작자 전용 문의함을 확인합니다. 빌드·TypeScript 검사 결과는 [`PORTFOLIO-WISHKET.md`](PORTFOLIO-WISHKET.md)에 기록합니다. 이 검증은 실회사 자료를 넣은 납품 검수가 아닙니다.

# 인수인계 (HANDOFF) — Unbound Studio 웹사이트

> **다른 Claude Code 계정/개발자가 맥락을 잃지 않고 이어서 작업하도록** 정리한 현재 상태 스냅샷.
> 빠른 시작·환경설정은 [README.md](./README.md), 배포·도메인은 [DEPLOY.md](./DEPLOY.md) 참고.
> _마지막 갱신: 2026-06 — gustngale 레퍼런스 기반 메인 전면 리뉴얼 + 반응형/성능 최적화 + 인계 준비까지 완료._

---

## 1. 프로젝트 한눈에
- **무엇**: 영상 제작 스튜디오 "Unbound Studio" 공식 사이트 (다크 테마, 풀페이지 스크롤)
- **운영**: https://www.unboundstudio.co.kr (Vercel 호스팅, `git push origin main` → 자동 배포)
- **저장소**: https://github.com/dit-jay93/unbound-studio (branch `main`)
- **스택**: Next.js 16(App Router, Turbopack) · React 19 · TS · Tailwind v4 · Framer Motion · Lenis(smooth scroll)
- **폰트**: 영문 **Montserrat**(헤드라인 800/본문 500) · 한글 **Paperlogy** · 숫자 **Roboto** (※ 과거 문서의 Bebas/DM Sans 아님)
- **컬러**: 액센트 `#e63226`(레드) / 보조 `#e85d24`(오렌지) / 배경 `#0a0a0a`. 토큰은 `src/app/globals.css` 의 `@theme`.

---

## 2. ⚠️ 반드시 알아야 할 구조적 사실 (가장 중요)

1. **메인페이지(`/`)는 "코드 고정"이다.**
   - 과거엔 Puck 비주얼 빌더(`/admin`) + Redis 문서로 렌더했으나, **현재 `src/app/page.tsx` 가 컴포넌트를 직접 렌더**한다.
   - 메인 섹션 수정 = `src/components/sections/home/*.tsx` 직접 편집. **`/admin` 빌더로는 메인이 안 바뀐다.**
   - 메인 섹션 순서: `HomeHero → HomeIntro → HomeImageBreak → HomeAdventure → HomeShowcase → (HomeBanner + HomeClients + HomeContact = 연속 배경 wrapper)`.

2. **Puck 빌더/Redis는 잔존하지만 메인엔 연결 안 됨.** `/admin`·`/sandbox`·`src/puck/`·`src/lib/config-store.ts`. 건드릴 일 거의 없음.
   - (참고: 과거 CTA 문구가 Redis에 baked 되어 코드 기본값이 안 먹은 적 있음 → 그래서 CTA 등은 렌더 단에서 값을 직접 지정한 이력)

3. **콘텐츠는 데이터 파일 주도.** `src/data/{works,clients,services,process}.ts`. (수정 위치 표는 README "4. 콘텐츠 수정 위치")

4. **환경변수**(`.env.local`): `RESEND_API_KEY`(문의메일), `KV_REST_API_URL/TOKEN`(빌더), `ADMIN_PASSWORD`/`ADMIN_SESSION_SECRET`(관리자). **없어도 화면은 정상**, 문의폼/관리자만 영향. 실제 값은 Vercel 환경변수에 등록됨. `.env.example` 참고.

---

## 3. 이번 세션들에서 한 주요 작업 (요약)

### A. 가오픈 인프라 — 도메인/SEO/메일
- 가비아 도메인 → Vercel 연결(A/CNAME), Cloudflare 잔재 레코드 충돌 제거. (DEPLOY.md)
- SEO 기본(sitemap/robots/metadata), 한글 브랜드명 인덱싱.
- 문의 폼 **Resend** 실연동: `src/app/api/contact/route.ts` (`FROM=noreply@unboundstudio.co.kr`, `TO=create@unboundstudio.co.kr`).

### B. 콘텐츠/페이지 정비
- Works(드라마·예능·광고·B2B) 데이터 + 로컬 썸네일(`public/works/`). 신규 드라마/영화 다수 추가.
- About 페이지: WHO WE ARE(헤드라인 + 소개 4단락, GIANTSTEP 스타일) + Our Client 로고 그리드.
- Services 페이지: 7개 서비스(기획/촬영/편집/VFX/색보정/AI/납품).
- 클라이언트 로고: 개별 PNG → **단일 가로 스트립 마퀴**(`public/clients/clients-strip-v2.png`).

### C. ⭐ 메인페이지 전면 리뉴얼 (gustngale.com / 클루닉스 레퍼런스)
- 메인을 코드로 새 8섹션 구성. 사용자가 레퍼런스 사이트를 제시 → 그 레이아웃 톤으로 재현.
- **HomeHero**: 풀폭, `100dvh`로 화면 꽉 채움(아래 섹션 안 보이게). 헤드라인 `MOVE WITHOUT LIMITS / CREATIVE STUDIO` 좌하단 오버레이 + `View Works` 우하단. 배경은 여러 번 수정 끝에 **"세포분열하는 부드러운 글로우"**로 확정: 레드/오렌지 radial 글로우 4개가 `1→2→4→합체`(9초). **딱딱한 메타볼(contrast 필터)은 "촌스럽다"고 반려됨** → 부드러운 blur 글로우만.
- **HomeIntro**: 라벨(Unbound Studio) + 소개 2단락. 중앙 정렬 블록(`max-w-4xl mx-auto`).
- **HomeImageBreak**: 풍경 배경(`public/image-break.webp`) 풀폭 띠. (높이 절반으로 조정함)
- **HomeAdventure**(Take the First Step / In Your Adventure): 채용 대신 **Project(문의)/Works(작품)** CTA. 중앙 정렬(`max-w-5xl`). 상하 여백 매우 크게.
- **HomeShowcase**: 대표작 **2×3(6개)** 그리드(`HomeShowcaseCard`), hover 시 YouTube 음소거 미리보기.
- **HomeClients**: 로고 스트립 마퀴(`animate-[marquee_90s_linear_infinite]`, 자체 타일링 이미지라 이음새 없음).
- **HomeBanner + HomeContact**: 하단 섹션들은 `page.tsx`에서 **하나의 연속 글로우 배경 wrapper**로 묶어 이음새 제거.

### D. 반응형 + 성능 최적화 (마지막)
- 반응형: 고정 px → `clamp()`/`vw`, hover 전용 → 터치 대응(Works 카드 정보 모바일 상시 노출), 로고·PROCESS 원형 등 태블릿/중간 화면 깨짐 수정.
- 성능(커밋 `e9f94b5`): **커서 `mix-blend-mode:difference` 제거**(전역 렉 최대 원인), 히어로 글로우 `left/top`→`transform`, `bg-fixed` 제거, 배경이미지 1.6MB PNG→**54KB webp**.

---

## 4. 반복해서 등장한 패턴 / 함정 (꼭 기억)

- **줄바꿈 요청이 매우 잦다.** 사용자는 "딱 N줄"을 원함. 패턴:
  - 데스크톱 1줄 고정: `md:whitespace-nowrap` + `max-w-*` 제거.
  - 특정 지점 줄바꿈: `<br />` 삽입(또는 `\n` + `whitespace-pre-line`).
  - "줄이 더 감긴다"의 원인은 대개 `max-w-*` 폭 제한 → 넓히거나 제거.
- **이미지 교체 시 같은 파일명이면 CDN/브라우저 캐시로 안 바뀐다.** → **파일명에 버전 붙여 캐시버스팅**(예: `-v2`). "안 바뀐다" 민원 단골 원인.
- **애니메이션은 `transform`(x/y/scale/rotate)만.** `left`/`top` 애니메이션 = 리페인트 렉. (`will-change-transform` 보조)
- **`mix-blend-mode`·`bg-fixed`는 렉 유발** → 지양.
- 로고는 다크 배경 위 **`brightness-0 invert`**로 흰색 처리. 반응형 안전성은 **높이(`max-h`) 기준** 사이징(너비 고정 px는 좁은 화면서 겹침).
- **한글 파일명**(맥→리눅스): NFC/NFD 깨짐 → Python `unicodedata.normalize("NFC", ...)`.
- **SVG는 next/image 막힘** → 일반 `<img>` + eslint-disable.
- 항상 `npm run build` 통과 확인 후 `git push`(자동 배포).

---

## 5. 사용자 작업 스타일 (다음 에이전트가 알면 좋은 것)
- **한국어 소통**, 스크린샷 + 짧은 지시("이거 이렇게 바꿔줘"), 빨간 화살표/박스 주석 자주 사용.
- **반복적·즉시 반영형**: 작게 바꾸고 보면서 조정. 매 수정마다 **빌드→커밋→푸시**까지 해주길 기대.
- **불필요한 질문 싫어함 + 틀린 추측도 싫어함** → 모호하면 핵심 1~2개만 질문, 명백하면 그냥 진행.
- **검증을 신뢰**: "안 바뀌었다"가 잦음(대개 캐시). 헤드리스로 라이브를 직접 측정해 증거 제시하면 신뢰.
  - 팁: 시스템에 `chromium-browser` 있음. 필요시 `npm i -D puppeteer-core`로 `scrollHeight`/줄 수/요소 크기 측정 후 **도구는 제거**(레포에 안 남김). 라이브 HTML은 `curl`로 확인.
- 세련된 톤 선호("촌스럽다" 반려), 여백·정렬·타이포에 민감.

---

## 6. 남은 작업 / 확인 필요 (TODO)
- **신규 5작품**(킹덤·기생수 더 그레이·바겐·기생충·외계+인 1부, `works.ts` id 22~26): **`videoUrl` 비어 있음** → 링크 받으면 채우고 쇼케이스 hover 미리보기 적용. **바겐** 채널 TVING 추정 — 확인 필요.
- 일부 **썸네일 PNG 1~1.6MB**(seven-escape-2, 신규작 등): Works 카드는 next/image가 자동 최적화하나 원본 webp 정리 여지.
- **모바일 성능**: 히어로 글로우 애니메이션 저사양/모바일 정지·단순화 옵션 미적용.
- **Lenis** 강도(`duration:1.2`)가 느리게 느껴질 여지(`src/components/providers/SmoothScrollProvider.tsx`).
- 신규작 `year/duration/period` 메타 빈 값.

---

## 7. 흔한 작업 빠른 참조
- **작품 추가**: 썸네일 `public/works/<slug>.jpg|png` → `src/data/works.ts` 항목 추가. 드라마/영화 제목은 `"드라마 '…'"`/`"영화 '…'"`로 시작해야 정렬 상위 그룹(`worksOrdered`의 `orderRank`).
- **메인 문구/레이아웃**: `src/components/sections/home/<섹션>.tsx`.
- **문의 수신 메일 변경**: `src/app/api/contact/route.ts` 의 `TO`.
- **색/폰트/간격 토큰**: `src/app/globals.css` 의 `@theme`.
- **클라이언트 로고 띠 교체**: 이미지 `public/clients/` 에 새 파일명으로 + `HomeClients.tsx` src 갱신.

# Unbound Studio — 웹사이트

영상 제작 스튜디오 **Unbound Studio**의 공식 포트폴리오 사이트.
운영 주소: https://www.unboundstudio.co.kr

- **스택**: Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4
- **애니메이션**: Framer Motion · Lenis(smooth scroll) · 커스텀 커서
- **호스팅**: Vercel (`git push origin main` → 자동 빌드/배포)
- **저장소**: https://github.com/dit-jay93/unbound-studio (branch: `main`)

> ⚠️ **이 Next.js는 일반 버전과 다를 수 있습니다.** 일부 API·규칙이 학습 데이터와 다를 수 있으니,
> 헷갈리면 `node_modules/next/dist/docs/` 의 해당 가이드를 먼저 확인하세요. (`AGENTS.md` 참고)

---

## 1. 빠른 시작 (다른 컴퓨터에서 인계받기)

### 사전 준비물
- **Node.js 20 이상** (개발에 사용한 버전: 22.x) — https://nodejs.org
- **Git**
- (선택) 코드 에디터: VS Code 권장

### 설치 & 실행
```bash
# 1) 저장소 클론
git clone https://github.com/dit-jay93/unbound-studio.git
cd unbound-studio

# 2) 환경변수 설정 (아래 2번 항목 참고)
cp .env.example .env.local
#   → .env.local 을 열어 실제 값 입력

# 3) 의존성 설치
npm install

# 4) 개발 서버 실행 → http://localhost:3000
npm run dev
```

### 주요 명령어
| 명령 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 (http://localhost:3000, 자동 새로고침) |
| `npm run build` | 프로덕션 빌드 (배포 전 오류 확인용) |
| `npm start` | 빌드 결과 로컬 실행 |
| `npm run lint` | ESLint 검사 |

> 환경변수가 비어 있어도 **사이트 화면은 정상 동작**합니다.
> 문의 폼 발송(`RESEND_API_KEY`)과 관리자 빌더(`/admin`, KV)만 해당 값이 필요합니다.

---

## 2. 환경변수 (`.env.local`)

`.env.example` 을 복사해 채웁니다. 실제 운영 값은 **Vercel → Settings → Environment Variables** 에 있습니다.

| 변수 | 용도 | 발급처 |
|---|---|---|
| `RESEND_API_KEY` | `/contact` 문의 폼 메일 발송 | [resend.com](https://resend.com) |
| `KV_REST_API_URL` / `KV_REST_API_TOKEN` | 관리자 빌더(`/admin`) 데이터 저장 (Upstash Redis) | [upstash.com](https://upstash.com) 또는 Vercel Storage |
| `ADMIN_PASSWORD` | `/admin` 로그인 비밀번호 | 직접 지정 |
| `ADMIN_SESSION_SECRET` | 관리자 세션 서명용 시크릿 | 랜덤 문자열 (`openssl rand -hex 32`) |

`.env.local` 은 `.gitignore` 로 제외되어 **절대 커밋되지 않습니다.**

---

## 3. 페이지 구성

| 경로 | 내용 |
|---|---|
| `/` | 홈 — Hero(세포분열 글로우) · 소개 · 이미지 · Take the First Step · Works 쇼케이스 · 배너 · 클라이언트 로고 · Contact |
| `/works` | 포트폴리오 목록 (필터: All / 드라마&예능 / 광고&홍보 / B2B) |
| `/works/[slug]` | 작업물 상세 (정적 생성, prev/next) |
| `/about` | 스튜디오 소개 / WHO WE ARE / Our Client |
| `/services` | 서비스 소개 |
| `/contact` | 연락처 + 문의 폼 (Resend 메일 발송) |
| `/admin` | 관리자 (Puck 비주얼 빌더) — 로그인 필요 |

---

## 4. 콘텐츠 수정 위치 (자주 쓰는 것)

대부분의 콘텐츠는 **데이터 파일**과 **섹션 컴포넌트**에 있습니다. 코드를 고치고 `git push` 하면 배포됩니다.

| 무엇을 | 어디서 |
|---|---|
| **작업물(Works) 추가/수정** | `src/data/works.ts` (썸네일은 `public/works/` 에 넣고 `thumbnailUrl` 지정) |
| **클라이언트 로고** | `src/data/clients.ts` + `public/clients/` (메인 로고 띠는 `public/clients/clients-strip-v2.png`) |
| **서비스 내용** | `src/data/services.ts` |
| **프로세스 단계** | `src/data/process.ts` |
| **홈페이지 각 섹션** | `src/components/sections/home/*.tsx` (Hero, Intro, ImageBreak, Adventure, Showcase, Banner, Clients, Contact) |
| **About / Services / Contact 페이지** | `src/app/{about,services,contact}/page.tsx` |
| **문의 메일 수신/발신 주소** | `src/app/api/contact/route.ts` (`TO` / `FROM`) |
| **색상·폰트·간격 토큰** | `src/app/globals.css` (`@theme`) |
| **중간 이미지 배경** | `public/image-break.webp` (교체 시 `HomeImageBreak.tsx`의 `IMAGE` 경로) |

### ⚠️ 홈페이지는 "코드 고정"입니다
홈(`/`)은 과거 Puck 빌더로 렌더했지만, 현재는 **`src/app/page.tsx` 에서 컴포넌트를 직접 렌더**합니다.
즉 **홈은 `/admin` 빌더에서 편집되지 않고**, 수정은 위 `home/*.tsx` 코드에서 합니다.
(`/admin` 빌더·KV는 남아 있으나 홈 화면에는 연결돼 있지 않습니다.)

---

## 5. 프로젝트 구조 (요약)

```
src/
  app/                # 라우트(App Router): page.tsx, layout.tsx, /works /about /services /contact /admin
    api/contact/      # 문의 폼 → Resend 메일 발송 라우트
  components/
    sections/home/    # 홈페이지 섹션들 (코드 고정)
    sections/         # 공통 섹션 (Works, Services, Process 등 — /works·/services 등에서 사용)
    layout/           # Header / Footer / Chrome
    ui/               # 버튼, 커서, 카운터 등 공용 UI
  data/               # 콘텐츠 데이터 (works, clients, services, process)
  lib/                # config-store(KV), site-config, admin-auth 등
  puck/               # Puck 빌더 설정 (관리자용)
public/               # 정적 에셋 (works/ clients/ 이미지, 로고, og 이미지 등)
```

---

## 6. 배포

- **자동 배포**: `git push origin main` → Vercel이 1~2분 내 자동 빌드·배포. 별도 명령 불필요.
- **롤백/도메인/DNS**: 상세는 **[DEPLOY.md](./DEPLOY.md)** 참고 (Vercel·가비아 DNS·SSL·이메일 레코드 정리).
- 배포 전 로컬에서 `npm run build` 로 빌드 오류가 없는지 확인하는 것을 권장합니다.

---

## 7. 참고 문서
- **[DEPLOY.md](./DEPLOY.md)** — 호스팅/도메인/DNS/이메일 설정 현황
- **[HANDOFF.md](./HANDOFF.md)** — 과거 작업 인수인계 기록
- **[AGENTS.md](./AGENTS.md)** / **[CLAUDE.md](./CLAUDE.md)** — AI 에이전트 작업 규칙

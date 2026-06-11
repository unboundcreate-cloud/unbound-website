# 배포 / 도메인 (DEPLOY) — Unbound Studio

> [HANDOFF.md](./HANDOFF.md)의 짝 문서. **어디에 어떻게 배포돼 있고, 도메인이 어떻게 연결됐는지**의
> 현재 상태 스냅샷. 다음 세션에서 맥락을 잃지 않기 위한 기록.

## 1. 한눈에 보기
- **호스팅**: Vercel (관리형). Next.js 16 자동 감지, 빌드/SSL 자동.
- **Vercel 프로젝트**: `unbound-studio-6e9f` → 기본 주소 `unbound-studio-6e9f.vercel.app`
- **GitHub 저장소**: `github.com/dit-jay93/unbound-studio` (branch: `main`)
- **자동 배포**: `git push origin main` → Vercel이 자동 빌드·배포. 별도 명령 불필요.
- **도메인**: `www.unboundstudio.co.kr` (메인) · `unboundstudio.co.kr`(apex)은 **308 → www 리다이렉트**
- **도메인 등록처(DNS 관리)**: 가비아(Gabia). Vercel은 호스팅만, DNS는 가비아에서 관리.

## 2. 배포 방법
- 평소: 코드 수정 → 커밋 → `git push origin main` → 1~2분 후 자동 반영.
- 미리보기: PR/브랜치 push 시 Vercel이 프리뷰 URL 자동 생성.
- 롤백: Vercel 대시보드 → Deployments → 이전 배포에서 **Promote to Production**.
- 수동 배포가 필요하면 CLI: `npx vercel --prod` (Vercel 로그인 필요).

## 3. 가비아 DNS 레코드 (현재 설정)
가비아: **My가비아 → 도메인 → `unboundstudio.co.kr` → DNS 관리툴(DNS 정보 → 설정)**

### 웹(Vercel)용 — 이 두 개가 사이트를 띄움
| 타입 | 호스트 | 값 | 비고 |
|---|---|---|---|
| A | `@` | `216.198.79.1` | Vercel apex (신규 IP 대역 권장값). 구값 `76.76.21.21`도 작동함 |
| CNAME | `www` | `6d8bded26d9d54c1.vercel-dns-017.com.` | ⚠️ **도메인 고유값** — Vercel 화면에 표시된 값 그대로 사용. 구값 `cname.vercel-dns.com.`도 작동함 |

> Vercel "DNS Change Recommended"(주황)는 오류가 아니라 신규 IP 대역으로의 갱신 권장 안내.
> 구값으로도 사이트는 정상 작동하지만, 신값으로 맞춰두는 것이 안전.

### ⚠️ 이메일용 — 절대 건드리지 말 것 (지우면 메일 끊김)
| 타입 | 호스트 | 값 | 용도 |
|---|---|---|---|
| MX | `@` | `kr1-aspmx1.worksmobile.com.` (10) | 네이버웍스 수신 |
| MX | `@` | `kr1-aspmx2.worksmobile.com.` (20) | 네이버웍스 수신 |
| TXT | `@` | `v=spf1 include:spf.worksmobile.com ~all` | 네이버웍스 SPF |
| TXT | `resend._domainkey` | `p=MIGf...` (DKIM) | Resend 발송 인증 |
| MX | `send` | `feedback-smtp.us-east-1.amazonses.com.` (10) | Resend(SES) |
| TXT | `send` | `v=spf1 include:amazonses.com ~all` | Resend SPF |

## 4. SSL
- Vercel이 도메인 검증 후 **Let's Encrypt 인증서 자동 발급/갱신**. 수동 작업 없음.
- `www` 는 발급 완료(HTTPS 정상). apex SSL은 검증 직후 자동 발급.

## 5. 작업 이력 (이번 가오픈)
1. GitHub 저장소를 Vercel에 Import → `unbound-studio-6e9f` 프로젝트 생성, 첫 배포 성공.
2. Vercel Settings → Domains 에 `www`(Primary) + apex(→www 리다이렉트) 추가.
3. 가비아 DNS에 A `@`(Vercel IP) + CNAME `www` 추가.
4. ⭐ **충돌 해결**: 가비아에 남아 있던 옛 Cloudflare A 레코드 2개
   (`104.18.26.246`, `104.18.27.246`)가 `@`에서 Vercel A와 충돌 → **삭제**. 이후 검증 통과.
5. Vercel 신규 IP 대역 권장에 맞춰 A/`www` CNAME 값 갱신(위 3번 표 기준).

## 6. 주의점 / 다음 작업
- 가비아 기본 파킹/웹호스팅 레코드가 다시 생기면 `@` A 레코드와 충돌하니 주의.
- 문의 폼은 아직 데모용(클라이언트 검증만). 실제 전송은 백엔드/Resend 연동 필요 — 이메일 DNS(Resend)는 이미 세팅돼 있으니 폼→Resend API 연결만 하면 됨.
- **다음**: 검색 노출(SEO) — 네이버 서치어드바이저 / 구글 Search Console 등록, robots/sitemap, 소유확인 메타태그. (작업 예정)

import { HomeHero } from "@/components/sections/home/HomeHero";
import { HomeAdventure } from "@/components/sections/home/HomeAdventure";
import { HomeImageBreak } from "@/components/sections/home/HomeImageBreak";
import { HomeIntro } from "@/components/sections/home/HomeIntro";
import { HomeShowcase } from "@/components/sections/home/HomeShowcase";
import { HomeBanner } from "@/components/sections/home/HomeBanner";
import { HomeClients } from "@/components/sections/home/HomeClients";
import { HomeContact } from "@/components/sections/home/HomeContact";

// 메인페이지 — gustngale 레퍼런스 레이아웃 기반 커스텀 구성(코드 고정).
// 빌더(Puck)가 아닌 코드로 직접 렌더 → 수정은 코드에서 진행.
export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeIntro />
      {/* 이미지 고정 + 텍스트 위로 올라오는 sticky 효과 */}
      <div className="relative">
        <div className="sticky top-0 z-0">
          <HomeImageBreak />
        </div>
        <div className="relative z-10 bg-brand-black">
          {/* 이미지에서 검은 배경으로 자연스럽게 이어지는 그라디언트 */}
          <div className="h-16 bg-gradient-to-b from-transparent to-brand-black -mt-16" />
          <HomeAdventure />
        </div>
      </div>
      <HomeShowcase />
      {/* 하단부(배너~로고~Contact)를 하나의 연속 배경으로 묶어 이음새 제거 */}
      <div className="relative overflow-hidden bg-brand-black">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[55vh] w-[80vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(230,50,38,0.13),transparent_70%)]" />
          <div className="absolute bottom-0 left-1/4 h-[55vh] w-[70vw] bg-[radial-gradient(ellipse_at_center,rgba(230,50,38,0.16),transparent_70%)]" />
        </div>
        <div className="relative">
          <HomeBanner />
          <HomeClients />
          <HomeContact />
        </div>
      </div>
    </>
  );
}

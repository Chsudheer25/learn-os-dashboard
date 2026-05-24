import { Suspense } from "react";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import BentoGrid from "@/components/bento/BentoGrid";
import HeroTile from "@/components/bento/HeroTile";
import ActivityTile from "@/components/bento/ActivityTile";
import CourseList from "@/components/bento/CourseList";
import SkeletonTile from "@/components/bento/SkeletonTile";

export default function Page() {
  return (
    <div className="flex min-h-screen bg-[#07070e]">
      <Sidebar />

      <main
        className="flex-1 flex flex-col min-h-screen lg:ml-64 md:ml-16 ml-0 pb-20 md:pb-0"
        id="main-content"
      >
        {/* animated background orbs */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          {/* top-left purple orb */}
          <div
            className="absolute -top-60 -left-60 w-[700px] h-[700px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
              animation: "orb-float 8s ease-in-out infinite",
            }}
          />
          {/* top-right indigo orb */}
          <div
            className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
              animation: "orb-float 10s ease-in-out infinite 2s",
            }}
          />
          {/* bottom cyan orb */}
          <div
            className="absolute -bottom-60 left-1/3 w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(6,182,212,0.10) 0%, transparent 70%)",
              animation: "orb-float 12s ease-in-out infinite 4s",
            }}
          />
          {/* center subtle glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full"
            style={{
              background: "radial-gradient(ellipse, rgba(139,92,246,0.05) 0%, transparent 70%)",
            }}
          />
        </div>

        <section className="relative z-10 flex-1 p-4 md:p-6 lg:p-8" aria-label="Dashboard content">
          <BentoGrid>
            <HeroTile studentName="Sudheer" streak={14} className="md:col-span-2 lg:col-span-2" />
            <ActivityTile className="md:col-span-1 lg:col-span-1" />

            {/* course tiles come from the DB — show skeletons while they load */}
            <Suspense fallback={<Skeletons />}>
              <CourseList />
            </Suspense>
          </BentoGrid>
        </section>
      </main>

      <MobileNav />
    </div>
  );
}

function Skeletons() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonTile key={i} />
      ))}
    </>
  );
}

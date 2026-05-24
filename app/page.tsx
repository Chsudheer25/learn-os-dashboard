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
    <div className="flex min-h-screen bg-bg-900">
      <Sidebar />

      <main
        className="flex-1 flex flex-col min-h-screen lg:ml-64 md:ml-16 ml-0 pb-20 md:pb-0"
        id="main-content"
      >
        {/* ambient background blobs */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-accent-purple/10 blur-[120px]" />
          <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-accent-indigo/8 blur-[100px]" />
          <div className="absolute -bottom-40 left-1/3 w-[400px] h-[400px] rounded-full bg-accent-cyan/6 blur-[100px]" />
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

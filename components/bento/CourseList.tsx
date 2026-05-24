import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Course } from "@/types/database";
import CourseTile from "./CourseTile";

// this is a Server Component — no "use client"
// wrapping it in <Suspense> in page.tsx gives us the skeleton fallback
export default async function CourseList() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    // bubble up to the nearest error.tsx boundary
    throw new Error(`Supabase fetch failed: ${error.message}`);
  }

  if (!data || data.length === 0) {
    return (
      <article className="col-span-full rounded-2xl border border-surface-border bg-bg-700 p-8 text-center">
        <p className="text-white/40 text-sm">
          No courses yet — add some rows to your Supabase courses table.
        </p>
      </article>
    );
  }

  return (
    <>
      {data.map((course: Course, i: number) => (
        <CourseTile key={course.id} course={course} index={i} />
      ))}
    </>
  );
}

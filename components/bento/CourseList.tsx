import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Course } from "@/types/database";
import CourseTile from "./CourseTile";

// fallback shown if Supabase isn't configured or the fetch fails
const mockCourses: Course[] = [
  { id: "1", title: "Advanced React Patterns",      progress: 75, icon_name: "Layers",  created_at: "" },
  { id: "2", title: "System Design Fundamentals",   progress: 42, icon_name: "Network", created_at: "" },
  { id: "3", title: "TypeScript Deep Dive",         progress: 90, icon_name: "Code2",   created_at: "" },
  { id: "4", title: "Next.js App Router Mastery",  progress: 60, icon_name: "Zap",     created_at: "" },
];

// Server Component — no "use client"
export default async function CourseList() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;

  // if env isn't configured yet, show mock data gracefully
  if (!url || url.includes("your-project-ref")) {
    return (
      <>
        {mockCourses.map((course, i) => (
          <CourseTile key={course.id} course={course} index={i} />
        ))}
      </>
    );
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: true });

    if (error || !data || data.length === 0) {
      return (
        <>
          {mockCourses.map((course, i) => (
            <CourseTile key={course.id} course={course} index={i} />
          ))}
        </>
      );
    }

    return (
      <>
        {data.map((course: Course, i: number) => (
          <CourseTile key={course.id} course={course} index={i} />
        ))}
      </>
    );
  } catch {
    // network error — fall back to mock data
    return (
      <>
        {mockCourses.map((course, i) => (
          <CourseTile key={course.id} course={course} index={i} />
        ))}
      </>
    );
  }
}

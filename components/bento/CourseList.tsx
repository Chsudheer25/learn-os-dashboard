import CourseTile from "./CourseTile";
import type { Course } from "@/types/database";

// fallback data used when Supabase isn't configured or fetch fails
const mockCourses: Course[] = [
  { id: "1", title: "Advanced React Patterns",       progress: 75, icon_name: "Layers",  created_at: "" },
  { id: "2", title: "System Design Fundamentals",    progress: 42, icon_name: "Network", created_at: "" },
  { id: "3", title: "TypeScript Deep Dive",          progress: 90, icon_name: "Code2",   created_at: "" },
  { id: "4", title: "Next.js App Router Mastery",   progress: 60, icon_name: "Zap",     created_at: "" },
];

async function fetchCourses(): Promise<Course[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // if env vars aren't set, skip the fetch and return mock data
  if (!url || !key || url.includes("your_supabase")) {
    return mockCourses;
  }

  try {
    const res = await fetch(`${url}/rest/v1/courses?select=*&order=created_at.asc`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) return mockCourses;

    const data: Course[] = await res.json();
    return data.length > 0 ? data : mockCourses;
  } catch {
    // network issue or bad credentials — fall back to mock
    return mockCourses;
  }
}

// Server Component — no "use client"
export default async function CourseList() {
  const courses = await fetchCourses();

  return (
    <>
      {courses.map((course, i) => (
        <CourseTile key={course.id} course={course} index={i} />
      ))}
    </>
  );
}

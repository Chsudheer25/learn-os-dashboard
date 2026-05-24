// Database types — matches the Supabase schema exactly

export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

// if you add more tables, extend Database here
export interface Database {
  public: {
    Tables: {
      courses: {
        Row: Course;
        Insert: Omit<Course, "id" | "created_at">;
        Update: Partial<Omit<Course, "id" | "created_at">>;
      };
    };
  };
}

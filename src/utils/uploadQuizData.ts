import { createClient } from "@supabase/supabase-js";
import quizData from "@/data/quizData.json";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function uploadQuizData() {
  const { data, error } = await supabase
    .from("quiz_questions")
    .insert(quizData);

  if (error) {
    console.error("Error uploading data:", error);
  } else {
    console.log("Data uploaded successfully:", data);
  }
}

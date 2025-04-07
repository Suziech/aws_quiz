import dynamic from "next/dynamic";

const Questions = dynamic(() => import("@/components/Questions"));

export default async function Page() {
  return <Questions />;
}

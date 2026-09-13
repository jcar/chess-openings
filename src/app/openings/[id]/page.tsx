import { notFound } from "next/navigation";
import { OPENINGS, getOpening } from "@/content";
import { TheoryView } from "./TheoryView";

export function generateStaticParams() {
  return OPENINGS.map((o) => ({ id: o.id }));
}

export default async function OpeningPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const spec = getOpening(id);
  if (!spec) notFound();
  return <TheoryView spec={spec} />;
}

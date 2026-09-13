import { notFound } from "next/navigation";
import { OPENINGS, getOpening } from "@/content";
import { TrainView } from "./TrainView";

export function generateStaticParams() {
  return OPENINGS.map((o) => ({ id: o.id }));
}

export default async function TrainPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const spec = getOpening(id);
  if (!spec) notFound();
  return <TrainView spec={spec} />;
}

import { notFound } from "next/navigation";
import { getWorks } from "@/lib/content-store";
import { WorkForm } from "@/components/admin/WorkForm";

export const dynamic = "force-dynamic";

export default async function WorkEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const works = await getWorks();
  const work = works.find((w) => w.id === id);
  if (!work) notFound();
  return <WorkForm work={work} mode="edit" />;
}

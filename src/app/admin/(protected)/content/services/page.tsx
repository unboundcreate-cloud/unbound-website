import { getServices } from "@/lib/content-store";
import { ServicesEditor } from "@/components/admin/ServicesEditor";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const services = await getServices();
  return <ServicesEditor initialServices={services} />;
}

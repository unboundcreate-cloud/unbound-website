"use client";

import { Render, type Data } from "@measured/puck";
import { config } from "@/puck/config";

export function RenderClient({ data }: { data: Data }) {
  return <Render config={config} data={data} />;
}

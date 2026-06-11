"use client";

import { Puck, type Data } from "@measured/puck";
import "@measured/puck/puck.css";
import { config } from "@/puck/config";

export function BuilderClient({ data }: { data: Data }) {
  const publish = async (doc: Data) => {
    const res = await fetch("/api/admin/builder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doc),
    });
    if (res.ok) {
      alert("저장됐습니다. /sandbox 에서 확인하세요.");
    } else {
      const { error } = await res.json().catch(() => ({}));
      alert("저장 실패: " + (error ?? ""));
    }
  };

  return (
    <Puck
      config={config}
      data={data}
      onPublish={publish}
      iframe={{ enabled: false }}
    />
  );
}

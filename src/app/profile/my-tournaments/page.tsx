"use client";

import * as React from "react";

export default function MyTournamentsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          My Tournaments
        </h1>
        <p className="text-sm text-slate-500">
          You don&apos;t have any tournaments yet. Once you create or join one,
          it will appear here.
        </p>
        {/* TODO: replace this with real list / table later */}
      </section>
    </main>
  );
}

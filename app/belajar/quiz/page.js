"use client";

import dynamic from "next/dynamic";

const QuizClient = dynamic(
  () => import("./QuizClient"),
  {
    ssr: false,
    loading: () => (
      <main className="min-h-screen bg-slate-100 pt-28 p-6">
        <p className="text-gray-500">
          Memuat quiz...
        </p>
      </main>
    ),
  }
);

export default function QuizPage() {
  return <QuizClient />;
}
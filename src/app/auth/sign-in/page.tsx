"use client";

import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <button
        onClick={() => signIn("google")}
        className="px-4 py-2 rounded bg-blue-600 text-white"
      >
        Continue with Google
      </button>
    </main>
  );
}

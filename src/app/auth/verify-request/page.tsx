"use client";

import Link from "next/link";

export default function VerifyRequestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Check your email</h2>
        <p className="text-sm text-slate-600 mb-4">
          We sent a sign-in link to your email. Open it to sign in.
        </p>
        <p className="text-xs text-slate-400 mb-6">
          If you don&apos;t see the email, check spam or try again.
        </p>
        <Link href="/auth/sign-in" className="inline-block">
          <button className="px-4 py-2 rounded-lg bg-orange-500 text-white">
            Back to Sign in
          </button>
        </Link>
      </div>
    </div>
  );
}

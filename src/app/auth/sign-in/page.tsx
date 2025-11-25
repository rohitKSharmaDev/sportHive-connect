"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { CircleArrowLeft } from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const disabled = loadingEmail || loadingGoogle;

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    try {
      setLoadingEmail(true);
      // magic link/email provider — make sure Email provider is configured in NextAuth
      await signIn("email", { email, callbackUrl: "/" });
    } finally {
      setLoadingEmail(false);
    }
  }

  async function handleGoogle() {
    try {
      setLoadingGoogle(true);
      await signIn("google", { callbackUrl: "/" });
    } finally {
      setLoadingGoogle(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 mt-4">
      <div className="p-4 shadow-2xl rounded-2xl flex flex-col justify-center h-[80vh]">
        {/* back arrow */}
        <div className="mb-6">
          <button
            aria-label="Back"
            onClick={() => history.back()}
            className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-transparent text-slate-700 hover:bg-slate-100"
          >
            <CircleArrowLeft />
          </button>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 leading-tight mb-6">
          Get Started with SportHive
        </h1>

        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Email"
            required
          />

          <button
            type="submit"
            disabled={disabled}
            className="w-full rounded-lg bg-orange-500 hover:bg-orange-600 active:scale-[.995] py-3 text-white font-semibold transition"
          >
            {loadingEmail ? "Sending..." : "Continue"}
          </button>
        </form>

        {/* OR divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="h-px bg-slate-200 flex-1" />
          <div className="text-xs text-slate-400 uppercase tracking-wider">
            or
          </div>
          <div className="h-px bg-slate-200 flex-1" />
        </div>

        {/* Google button */}
        <div>
          <button
            onClick={handleGoogle}
            disabled={disabled}
            className="w-full flex items-center justify-center gap-3 rounded-lg border border-slate-200 py-3 bg-white hover:bg-slate-50 transition text-sm"
          >
            <svg
              aria-hidden
              width="18"
              height="18"
              viewBox="0 0 533.5 544.3"
              className="inline-block"
            >
              <path
                fill="#4285f4"
                d="M533.5 278.4c0-18.5-1.6-32.5-4.9-46.7H272.1v88.6h147.6c-6.4 35.3-25.2 58.8-52.8 77.1v63h85.3c50.4-46.5 81.3-114.6 81.3-190z"
              />
              <path
                fill="#34a853"
                d="M272.1 544.3c71.8 0 132-23.6 176-64.2l-85.3-63c-23.8 16-54.2 26.1-90.7 26.1-69.9 0-129.3-47.2-150.5-110.7h-89.7v69.7C73 480.3 166.2 544.3 272.1 544.3z"
              />
              <path
                fill="#fbbc04"
                d="M121.6 323.5c-5.8-17.6-9.1-36.4-9.1-55.5s3.3-37.9 9.1-55.5v-69.7h-89.7C9.7 171.6 0 219 0 267.9s9.7 96.3 31.9 139.6l89.7-83.9z"
              />
              <path
                fill="#ea4335"
                d="M272.1 107.9c39 0 74.1 13.4 101.7 39.6l76.1-76.1C403.9 24.9 347.7 0 272.1 0 166.2 0 73 64 31.9 154.3l89.7 69.7c21.2-63.5 80.6-110.7 150.5-110.7z"
              />
            </svg>

            <span className="text-sm text-slate-700 font-medium">
              {loadingGoogle ? "Redirecting..." : "Continue with Google"}
            </span>
          </button>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          By continuing, you agree to our <a className="underline">Terms</a> and{" "}
          <a className="underline">Conditions</a>
        </p>
      </div>
    </div>
  );
}

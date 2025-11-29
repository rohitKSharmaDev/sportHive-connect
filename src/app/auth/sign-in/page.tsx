"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { CircleArrowLeft } from "lucide-react";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const SignInSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

// Type for RHF
type SignInForm = z.infer<typeof SignInSchema>;

export default function SignInPage() {
  const router = useRouter();
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const form = useForm<SignInForm>({
    resolver: zodResolver(SignInSchema),
    defaultValues: { email: "" },
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = form;

  const disabled = isSubmitting || loadingGoogle;

  // -------------------------
  // 2) Email magic link handler
  // -------------------------
  async function onSubmit(values: SignInForm) {
    // 🚀 Fake magic link mode
    if (process.env.NEXT_PUBLIC_FAKE_MAGIC_LINK === "true") {
      const res = await signIn("credentials", {
        email: values.email,
        redirect: false, // ❗ don't auto-redirect
        callbackUrl: "/onboarding",
      });

      if (!res?.error) {
        router.push("/onboarding"); // 🎯 go directly
      }
      return;
    }

    // REAL magic link (EmailProvider)
    const res = await signIn("email", {
      email: values.email,
      redirect: false, // again, don't auto redirect
      callbackUrl: "/onboarding",
    });

    if (!res?.error) {
      router.push("/onboarding");
    } else {
      console.error("Email signin failed", res);
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

        {/* -------------------------------
            Email sign-in with RHF + zod
        -------------------------------- */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <label htmlFor="email" className="sr-only">
            Email
          </label>

          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            disabled={disabled}
            {...register("email")}
            className="block w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          {/* validation message */}
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <button
            type="submit"
            disabled={disabled}
            className="w-full rounded-lg bg-orange-500 hover:bg-orange-600 active:scale-[.995] py-3 text-white font-semibold transition"
          >
            {isSubmitting ? "Sending..." : "Continue"}
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

        {/* -------------------------------
            Google OAuth
        -------------------------------- */}
        <div>
          <button
            onClick={handleGoogle}
            disabled={disabled}
            className="w-full flex items-center justify-center gap-3 rounded-lg border border-slate-200 py-3 bg-white hover:bg-slate-50 transition text-sm"
          >
            <GoogleIcon />

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

// -------------------------
// Google SVG extracted as a component
// -------------------------
function GoogleIcon() {
  return (
    <svg aria-hidden width="18" height="18" viewBox="0 0 533.5 544.3">
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
  );
}

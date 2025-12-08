"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileDetails from "./components/profile-details";
import GenderSelect from "./components/gender-select";
import UserInterests from "./components/user-interests";
import { ProfileDataType } from "./interfaces/profile-data-type";
import { toast } from "sonner";

async function completeOnboarding(router: ReturnType<typeof useRouter>) {
  const response = await fetch('/api/user/onboarding', {
    method: 'POST',
  });

  if (response.ok) {
    router.push('/dashboard'); // or your main app route
    router.refresh(); // Refresh to show BottomNav
  }
}

function PreparingAccount() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="flex flex-col items-center gap-6">
        <div className="w-44 h-44 relative">
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <defs>
              <linearGradient id="gA" x1="0" x2="1">
                <stop offset="0" stopColor="#ff6b35" />
                <stop offset="1" stopColor="#ff3a2f" />
              </linearGradient>
            </defs>

            <circle
              cx="60"
              cy="60"
              r="48"
              stroke="#eee"
              strokeWidth="2"
              fill="none"
            />
            <g transform="rotate(-90 60 60)">
              <circle
                cx="60"
                cy="60"
                r="48"
                stroke="url(#gA)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="302"
                strokeDashoffset="302"
                className="animate-prep"
              />
            </g>
          </svg>
        </div>

        <div className="text-sm text-gray-600">Preparing account..</div>
      </div>

      <style jsx>{`
        .animate-prep {
          animation: dash 1.6s linear infinite;
        }
        @keyframes dash {
          0% {
            stroke-dashoffset: 240;
          }
          50% {
            stroke-dashoffset: 80;
          }
          100% {
            stroke-dashoffset: 240;
          }
        }
      `}</style>
    </div>
  );
}

export default function OnboardingPage() {
  const [step, setStep] = useState<number>(0);
  const [profileData, setProfileData] = useState<ProfileDataType | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (step !== 3 || !profileData) return;

    console.log({ profileData });

    let mounted = true;
    (async () => {
      try {
        // show preparing UI while updating
        // call the server API to save profile and mark profileDone
        const res = await fetch("/api/user/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profileData),
          credentials: "same-origin",
        });

        if (!mounted) return;

        if (!res.ok) {
          const txt = await res.text().catch(() => "error");
          console.error("failed to update user:", txt);
          toast.error?.("Could not complete onboarding");
          // optionally revert to previous step
          return;
        }

        // success — call completeOnboarding
        await completeOnboarding(router);
      } catch (e) {
        console.error("onboarding submit error", e);
        toast.error?.("Network error");
      }
    })();

    return () => {
      mounted = false;
    };
  }, [step, profileData, router]);

  return (
    <div className="bg-gray-50 flex items-start justify-center py-8 px-4">
      <div className="w-full max-w-md">
        {step === 0 && (
          <ProfileDetails
            onContinue={(payload: ProfileDataType) => {
              setProfileData(payload);
              setStep(1);
            }}
          />
        )}

        {step === 1 && (
          <GenderSelect
            initialStep={1}
            totalSteps={4}
            onBack={() => setStep(0)}
            onComplete={(gender) => {
              // merge gender into saved profileData and go to interests
              const final = {
                ...(profileData ?? {}),
                gender,
              } as ProfileDataType;
              setProfileData(final);
              setStep(2); // go to UserInterests
            }}
          />
        )}

        {step === 2 && (
          <UserInterests
            initial={[]}
            onBack={() => setStep(1)}
            onContinue={(selected) => {
              // require at least 2 in component; but double-check here
              if (!selected || selected.length < 2) return;
              const updated = {
                ...(profileData ?? {}),
                sportsInterests: selected,
              } as ProfileDataType & {
                sportsInterests?: string[];
              };
              setProfileData(updated);
              // move to preparing state which will redirect after 5s
              setStep(3);
            }}
          />
        )}

        {step === 3 && <PreparingAccount />}
      </div>
    </div>
  );
}

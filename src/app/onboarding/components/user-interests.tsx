"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { sportsInterstsList } from "@/lib/constants";
import Image from "next/image";

export default function UserInterests({
  initial = [] as string[],
  onContinue,
  onBack,
}: {
  initial?: string[];
  onContinue?: (selected: string[]) => void;
  onBack?: () => void;
}) {
  const [selected, setSelected] = useState<string[]>(initial);
  const minRequired = 2;

  function toggle(item: string) {
    setSelected((s) =>
      s.includes(item) ? s.filter((x) => x !== item) : [...s, item]
    );
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-white p-4 md:p-10">
      <div className="w-full max-w-md md:max-w-2xl">
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={onBack}
            aria-label="back"
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="#111827"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="flex-1">
            <div className="h-2 w-24 bg-gray-200 rounded-full relative overflow-hidden mb-2">
              <div
                className="absolute left-0 top-0 h-full bg-orange-500 rounded-full"
                style={{ width: "66%" }}
              />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
              What are you interested in?
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Choose min. 2 categories you like, you can change them later
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 mb-6">
          {sportsInterstsList.map((sport) => {
            const active = selected.includes(sport.sportName);
            return (
              <button
                key={sport.sportName}
                onClick={() => toggle(sport.sportName)}
                className={`flex flex-col overflow-hidden rounded-2xl p-0 border transition transform-gpu focus:outline-none
                  ${
                    active
                      ? "bg-orange-500 border-orange-400 shadow-lg scale-[1.02]"
                      : "bg-white border-gray-200 hover:shadow-md"
                  }`}
                aria-pressed={active}
                aria-label={sport.sportName}
                style={{ minHeight: 120 }}
              >
                {/* image area - decorative */}
                <div
                  className={`h-28 w-full ${
                    active ? "bg-orange-400" : "bg-gray-100"
                  } overflow-hidden`}
                >
                  <Image
                    src={sport.sportThumbnailImg!}
                    alt={sport.sportName}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* label */}
                <div
                  className={`py-3 text-center text-sm font-medium ${
                    active ? "text-white" : "text-gray-700"
                  }`}
                >
                  {sport.sportName}
                </div>
              </button>
            );
          })}
        </div>

        <div className="fixed left-0 right-0 bottom-6 px-4 md:static md:px-0">
          <div className="max-w-md md:max-w-2xl mx-auto">
            <Button
              className="w-full py-3"
              onClick={() => onContinue?.(selected)}
              disabled={selected.length < minRequired}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

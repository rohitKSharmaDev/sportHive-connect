// app/onboarding/components/profile-details.tsx
"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as ChevronDown } from "lucide-react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export default function ProfileDetailsForm({
  onContinue,
}: {
  onContinue?: (payload: {
    firstName: string;
    lastName: string;
    date: string;
  }) => void;
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [dobPickerOpen, setDobPickerOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setAvatarPreview(url);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const isoDate = date ? date.toISOString().slice(0, 10) : "";
    const payload = { firstName, lastName, date: isoDate };
    if (onContinue) onContinue(payload);
    console.log("continue payload", payload);
  }

  return (
    <div className="flex items-start justify-center p-6 md:p-12">
      <div className="w-full md:max-w-2xl bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <button
            aria-label="back"
            className="p-1 rounded-full hover:bg-gray-100"
            onClick={() => window.history.back()}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="#111827"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="w-16 h-2 bg-gray-200 rounded-full">
            <div className="w-1/3 h-2 bg-gray-300 rounded-full" />
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
          Tell me some details please?
        </h2>
        <p className="text-sm text-slate-500 mt-2 mb-6">
          This will help your friend to find your SportHive account
        </p>

        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden">
              {avatarPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatarPreview}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-300">
                  <svg
                    width="42"
                    height="42"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z"
                      stroke="#CBD5E1"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20 21a8 8 0 00-16 0"
                      stroke="#CBD5E1"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleFileChange}
              id="avatar-upload"
            />

            <Button
              type="button"
              onClick={() => fileRef.current?.click()}
              variant={"outline"}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 py-1 rounded-full text-sm shadow-sm border cursor-pointer"
            >
              Upload
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                className="mt-1"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="date" className="px-1">
              Date of birth
            </Label>

            <div className="mt-2">
              <Popover open={dobPickerOpen} onOpenChange={setDobPickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full h-12 justify-between font-normal"
                  >
                    <span>
                      {date ? date.toLocaleDateString() : "Select date"}
                    </span>
                    <ChevronDown size={16} />
                  </Button>
                </PopoverTrigger>

                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <div className="p-3">
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      onSelect={(d) => {
                        setDate(d);
                        setDobPickerOpen(false);
                      }}
                    />

                    <div className="flex items-center justify-between mt-2">
                      <button
                        type="button"
                        className="text-sm px-3 py-1 rounded hover:bg-gray-100"
                        onClick={() => {
                          setDate(undefined);
                        }}
                      >
                        Clear
                      </button>
                      <div className="text-sm text-gray-500">
                        Tap a date to select
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="pt-4">
            <Button className="w-full py-3" type="submit">
              Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

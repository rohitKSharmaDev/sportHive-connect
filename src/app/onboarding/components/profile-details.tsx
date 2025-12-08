"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as ChevronDown } from "lucide-react";
import { ProfileDataType } from "../interfaces/profile-data-type";
import { useAvatar } from "@/app/providers/AvatarProvider";

const nameValidator = z
  .string()
  .refine((s) => s.length > 0, { 
    message: "This field is required." 
  })
  .refine((s) => s === s.trim(), {
    message: "No leading or trailing spaces allowed.",
  })
  .refine((s) => /^[A-Za-z ]+$/.test(s), {
    message: "Only alphabetic characters and spaces are allowed.",
  })
  .refine(
    (s) => {
      const len = s.trim().length;
      return len >= 3 && len <= 20;
    },
    { message: "Name must be between 3 and 20 characters." }
  );

const schema = z.object({
  firstName: nameValidator,
  lastName: nameValidator,
  dob: z
    .string()
    .nonempty("Please select your date of birth.")
    .refine(
      (iso) => {
        const d = new Date(iso + "T00:00:00");
        if (isNaN(d.getTime())) return false;
        const today = new Date();
        let age = today.getFullYear() - d.getFullYear();
        const m = today.getMonth() - d.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
        return age >= 13;
      },
      { message: "You must be at least 13 years old." }
    ),
  avatar: z.any().optional(),
});

type FormSchema = z.infer<typeof schema>;

export default function ProfileDetailsForm({
  onContinue,
}: {
  onContinue?: (payload: ProfileDataType ) => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
    trigger,
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: { firstName: "", lastName: "", dob: "", avatar: undefined },
    mode: "onBlur",
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [dobPickerOpen, setDobPickerOpen] = useState(false);
  const dateValue = useWatch({ control, name: "dob" }) as string | undefined;

  const selectedDate = dateValue
    ? new Date(dateValue + "T00:00:00")
    : undefined;
  const maxAvatarSize = 500 * 1024; // 500 KB
  const minAvatarSize = 20 * 1024; // 20 KB
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

  const { setAvatarUrl } = useAvatar();

  useEffect(() => {
    if (dobPickerOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [dobPickerOpen]);

  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarPreview]);

  // avatar input handler — validates and sets form value
  async function onAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;

    if (!allowedTypes.includes(f.type)) {
      toast.error("Invalid file type", {
        description: "Only JPG, JPEG, and PNG images are allowed.",
      });
      e.currentTarget.value = "";
      return;
    }

    if (f.size < minAvatarSize) {
      toast.error("Image too small", {
        description: "Please upload an image at least 20 KB.",
      });
      e.currentTarget.value = "";
      return;
    }

    if (f.size > maxAvatarSize) {
      toast.error("Image too large", {
        description: "Please upload an image smaller than 5 MB.",
      });
      e.currentTarget.value = "";
      return;
    }

    const url = URL.createObjectURL(f);
    setAvatarPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });

    await setAvatarUrl(url);
    

    setValue("avatar", f, { shouldValidate: false });
    toast.success("Photo added", {
      description: "Your avatar has been added.",
    });
  }

  // Calendar boundaries for >=13 years
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() - 13,
    today.getMonth(),
    today.getDate()
  );
  const minDate = new Date(1900, 0, 1);
  const startMonth = new Date(1900, 0, 1);
  const endMonth = new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);

  function onCalendarSelect(d?: Date) {
    if (!d) return;
    if (d < minDate || d > maxDate) {
      return;
    }
    const iso = d.toISOString().slice(0, 10);
    setValue("dob", iso, { shouldValidate: true, shouldDirty: true });
    setDobPickerOpen(false);
  }

  async function onSubmit(values: FormSchema) {
    // values are validated by Zod + RHF resolver
    if (onContinue) {
      const payload = {
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        dob: values.dob,
        avatarImage: values.avatar ?? null,
        sportsInterests: [],
      };
      await onContinue(payload);
    }
    console.log("submit payload", values);
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
                <Image
                  src={avatarPreview}
                  alt="avatar"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover rounded-full"
                  unoptimized
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
              accept="image/png,image/jpeg,image/jpg"
              className="sr-only"
              onChange={onAvatarChange}
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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <div className="grid grid-cols-1 gap-3">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                {...register("firstName")}
                placeholder="First name"
                className="mt-1"
                aria-invalid={!!errors.firstName}
                aria-describedby={
                  errors.firstName ? "firstName-error" : undefined
                }
                onFocus={() => {
                  /* RHF handles touched/dirty; trigger clears handled by mode */
                }}
                onBlur={() => {
                  // run validation on blur
                  void trigger("firstName");
                }}
              />
              {errors.firstName && (
                <p
                  id="firstName-error"
                  role="alert"
                  className="text-sm text-red-600 mt-1"
                >
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                {...register("lastName")}
                placeholder="Last name"
                className="mt-1"
                aria-invalid={!!errors.lastName}
                aria-describedby={
                  errors.lastName ? "lastName-error" : undefined
                }
                onBlur={() => {
                  void trigger("lastName");
                }}
              />
              {errors.lastName && (
                <p
                  id="lastName-error"
                  role="alert"
                  className="text-sm text-red-600 mt-1"
                >
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-2 relative">
            {dobPickerOpen && (
              <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={() => setDobPickerOpen(false)}
              />
            )}

            <Popover open={dobPickerOpen} onOpenChange={setDobPickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-12 justify-between font-normal"
                  aria-expanded={dobPickerOpen}
                  aria-haspopup="dialog"
                >
                  <span>
                    {selectedDate
                      ? selectedDate.toLocaleDateString()
                      : "Select date"}
                  </span>
                  <ChevronDown size={16} />
                </Button>
              </PopoverTrigger>

              <PopoverContent
                className="w-auto overflow-hidden p-0 z-50 relative"
                align="start"
              >
                <div className="p-3">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    captionLayout="dropdown"
                    startMonth={startMonth}
                    endMonth={endMonth}
                    disabled={[{ after: maxDate }, { before: minDate }]}
                    onSelect={onCalendarSelect}
                  />

                  <div className="flex items-center justify-between mt-2">
                    <button
                      type="button"
                      className="text-sm px-3 py-1 rounded hover:bg-gray-100"
                      onClick={() => setValue("dob", "")}
                    >
                      Clear
                    </button>

                    <div className="text-gray-500" style={{ fontSize: "10px" }}>
                      Select your birth date (must be 13+ years)
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            {errors.dob && (
              <p
                id="date-error"
                role="alert"
                className="text-sm text-red-600 mt-2"
              >
                {errors.dob.message}
              </p>
            )}
          </div>

          <div className="pt-4">
            <Button
              className="w-full py-3"
              type="submit"
              disabled={isSubmitting}
            >
              Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

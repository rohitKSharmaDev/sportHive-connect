"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";

export type DOBPickerProps = {
  id?: string;
  value?: string | null; // ISO date string (yyyy-mm-dd) or null
  onChange?: (isoDate: string | null) => void;
  placeholder?: string;
};

export default function DOBPicker({
  id = "dob",
  value = null,
  onChange,
  placeholder = "DD/MM/YYYY",
}: DOBPickerProps) {
  const [selected, setSelected] = useState<Date | undefined>(() => {
    if (!value) return undefined;
    const d = new Date(value);
    return isNaN(d.getTime()) ? undefined : d;
  });

  function handleSelect(day?: Date) {
    if (!day) {
      setSelected(undefined);
      onChange?.(null);
      return;
    }
    setSelected(day);
    const iso = day.toISOString().slice(0, 10); // yyyy-mm-dd
    onChange?.(iso);
  }

  const formatted = selected ? format(selected, "dd/MM/yyyy") : "";

  return (
    <div className="w-full">
      <Label htmlFor={id}>Date of Birth</Label>
      <div className="relative mt-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between p-0 rounded"
            >
              <Input
                id={id}
                readOnly
                value={formatted}
                placeholder={placeholder}
                className="cursor-pointer pr-10"
                onClick={(e) => e.preventDefault()}
                aria-label="Date of birth"
              />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0" align="start">
            <div className="p-3">
              <Calendar
                mode="single"
                selected={selected}
                onSelect={handleSelect}
                captionLayout="dropdown"
              />

              <div className="flex items-center justify-between mt-2">
                <button
                  type="button"
                  className="text-sm px-3 py-1 rounded hover:bg-gray-100"
                  onClick={() => handleSelect(undefined)}
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

        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <CalendarIcon size={18} />
        </div>
      </div>
    </div>
  );
}

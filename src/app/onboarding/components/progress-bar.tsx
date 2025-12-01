"use client";

type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
};

export default function ProgressBar({
  currentStep,
  totalSteps,
}: ProgressBarProps) {
  // Avoid division by zero
  const pct = totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 0;

  return (
    <div className="w-full flex items-center space-x-3">
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        {/* animated width */}
        <div
          aria-hidden
          className="h-full bg-linear-to-r from-orange-500 to-orange-400 transition-[width] duration-500 ease-out"
          style={{ width: `${Math.max(0, Math.min(100, pct))}%` }}
        />
      </div>

      {/* small segmented indicator for clarity */}
      <div className="hidden sm:flex items-center gap-1">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`w-6 h-2 rounded-full transition-colors duration-300 ${
              i < currentStep ? "bg-orange-500" : "bg-gray-200"
            }`}
            aria-hidden
          />
        ))}
      </div>
    </div>
  );
}

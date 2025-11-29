import React from "react";
import ProfileDetails from "./components/profile-details";

export const metadata = {
  title: "Onboarding — Profile details",
  description: "Tell us a little about you",
};

export default function OnboardingPage() {
  return (
    <>
      <ProfileDetails />
    </>
  );
}

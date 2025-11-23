import Image from "next/image";
import logo from "../../public/logo-main.svg";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white sm:items-start">
        <Card>
          <Image src={logo} alt="SportHive Connect Logo" priority />
          <h1 className="text-5xl font-bold font-sans text-gray-900 mb-8">
            Welcome to SportHive Connect
          </h1>
          <p className="text-lg text-gray-700 mb-16">
            Find, join and play together with SportHive.
          </p>
          <Button>
            Get Started
          </Button>

        </Card>
      </main>
    </div>
  );
}

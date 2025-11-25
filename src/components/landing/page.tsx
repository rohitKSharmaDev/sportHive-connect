"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { heroCarouselSlides } from "@/lib/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function LandingHeroCarousel() {
  const router = useRouter();
  const [current, setCurrent] = React.useState(0);
  const [isMounted, setIsMounted] = React.useState(false);

  const total = heroCarouselSlides.length;

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (!isMounted || total <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 4000);

    return () => clearInterval(timer);
  }, [isMounted, total]);

  if (!isMounted) return null;

  const handleCtaClick = () => {
    router.push("/auth/sign-in");
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-2 lg:mt-5">
      <Carousel
        key={current} // force remount so startIndex is respected
        opts={{ loop: true, startIndex: current }}
        className="w-full shadow-xl sm:shadow-2xl px-4 rounded-xl"
      >
        <CarouselContent>
          {heroCarouselSlides.map((slide, index) => (
            <CarouselItem key={slide.id}>
              <Card className="border-none shadow-none bg-transparent">
                <CardContent className="flex flex-col items-center gap-6 p-0">
                  {/* Responsive Image Wrapper */}
                  <div
                    className="
                      relative w-full
                      h-[60vh]
                      md:h-[50vh]
                      lg:h-[55vh]
                    "
                  >
                    <Image
                      src={slide.imgSrc!}
                      alt={slide.title}
                      fill
                      className="
                        object-cover
                        rounded-[28px]
                        bg-linear-to-br from-slate-100 to-slate-200
                      "
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>

                  {/* Indicators */}
                  <div className="flex items-center gap-2 mt-3">
                    {heroCarouselSlides.map((s, idx) => (
                      <span
                        key={s.id}
                        className={[
                          "h-2 w-2 rounded-full transition-all",
                          idx === current
                            ? "bg-orange-500 w-4"
                            : "bg-slate-300",
                        ].join(" ")}
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <div className="text-center space-y-2">
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                      {slide.title}
                    </h1>
                    <p className="text-sm text-slate-500">{slide.subtitle}</p>
                  </div>

                  {/* CTA */}
                  <Button className="h-11 rounded-full text-sm font-semibold self-center" onClick={handleCtaClick}>
                    {slide.cta}
                  </Button>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

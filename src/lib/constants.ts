import { StaticImageData } from 'next/image';
import allSportsHeroImg from '../../public/hero-carousel-images/all-sports-equipment.webp'
import badmintonHeroImg from "../../public/hero-carousel-images/badminton-court-rackets-and-shuttles.webp";
import cricketHeroImg from "../../public/hero-carousel-images/cricke-bat-ball-and-helmet.webp";

type HeroSlide = {
  id: number;
  title: string;
  subtitle: string;
  cta: string;
  imgSrc?: StaticImageData;
};

export const heroCarouselSlides: HeroSlide[] = [
  {
    id: 1,
    title: "Fitness made easy",
    subtitle: "Find and book local sports in a blink.",
    cta: "Get started now",
    imgSrc: allSportsHeroImg,
  },
  {
    id: 2,
    title: "Find your next match",
    subtitle: "Explore nearby tournaments and events.",
    cta: "Browse events",
    imgSrc: badmintonHeroImg,
  },
  {
    id: 3,
    title: "Play with your crew",
    subtitle: "Invite friends and build your squad.",
    cta: "Create a team",
    imgSrc: cricketHeroImg,
  },
];

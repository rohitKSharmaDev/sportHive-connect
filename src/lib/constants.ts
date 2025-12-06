import { StaticImageData } from 'next/image';
import allSportsHeroImg from '../../public/hero-carousel-images/all-sports-equipment.webp'
import badmintonHeroImg from "../../public/hero-carousel-images/badminton-court-rackets-and-shuttles.webp";
import cricketHeroImg from "../../public/hero-carousel-images/cricke-bat-ball-and-helmet.webp";
import { SportsInterestsType } from '@/app/onboarding/interfaces/sports-interests';

import acribaticsThumbImg from '../../public/sports-thumbnails/acrobatics-thumbnail.jpg';
import badmintonThumbImg from '../../public/sports-thumbnails/badminton-thumbnail.jpg';
import basketballThumbImg from '../../public/sports-thumbnails/basketball-thumbnail.jpg';
import boxingThumbImg from '../../public/sports-thumbnails/boxing-thumbnail.jpg';
import cricketThumbImg from '../../public/sports-thumbnails/cricket-thumbnail.jpg';
import footballThumbImg from '../../public/sports-thumbnails/football-thumbnail.jpg';
import lawnTennisThumbImg from '../../public/sports-thumbnails/lawn-tennis-thumbnail.jpg';
import yogaThumbImg from '../../public/sports-thumbnails/yoga-thumbnail.jpg';

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

export const sportsInterstsList: SportsInterestsType[] = [
  {
    sportName: "Acrobatics",
    sportThumbnailImg: acribaticsThumbImg,
  },
  {
    sportName: "Badminton",
    sportThumbnailImg: badmintonThumbImg,
  },
  {
    sportName: "Basketball",
    sportThumbnailImg: basketballThumbImg,
  },
  {
    sportName: "Boxing",
    sportThumbnailImg: boxingThumbImg,
  },
  {
    sportName: "Cricket",
    sportThumbnailImg: cricketThumbImg,
  },
  {
    sportName: "Football",
    sportThumbnailImg: footballThumbImg,
  },
  {
    sportName: "Lawn Tennis",
    sportThumbnailImg: lawnTennisThumbImg,
  },
  {
    sportName: "Yoga",
    sportThumbnailImg: yogaThumbImg,
  }
];
import { useTitle } from '../lib/hooks';
import Hero from '../sections/Hero';
import Stats from '../sections/Stats';
import AboutTeaser from '../sections/AboutTeaser';
import StagesStack3D from '../sections/StagesStack3D';
import NoticeBoard from '../sections/NoticeBoard';
import FacilitiesRail3D from '../sections/FacilitiesRail3D';
import GalleryRing3D from '../sections/GalleryRing3D';
import ReviewsCarousel from '../sections/ReviewsCarousel';
import AdmissionsCTA from '../sections/AdmissionsCTA';

export default function Home() {
  useTitle('');
  return (
    <>
      <Hero />
      <Stats />
      <AboutTeaser />
      <StagesStack3D />
      <NoticeBoard />
      <FacilitiesRail3D />
      <GalleryRing3D />
      <ReviewsCarousel />
      <AdmissionsCTA />
    </>
  );
}

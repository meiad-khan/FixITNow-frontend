import BookingCTA from "./_components/home/BookingCTA";
import CustomerReviews from "./_components/home/CustomerReviews";
import FeaturedTechnicians from "./_components/home/FeaturedTechnicians";
import HeroSection from "./_components/home/HeroSection";
import HowItWorks from "./_components/home/HowItWorks";
import PopularServices from "./_components/home/PopularServices";
import WhyChooseUs from "./_components/home/WhyChooseUs";

export default function Page() {
  return (
    <main>
      <HeroSection/>
      <PopularServices />
      <WhyChooseUs />
      <HowItWorks />
      <FeaturedTechnicians />
      <CustomerReviews />
      <BookingCTA />
    </main>
  )
}

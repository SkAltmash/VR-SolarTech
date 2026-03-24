import HomeHeroSection from "../componnets/home/HomeHeroSection";
import HomeTrustSection from "../componnets/home/HomeTrustSection";
import HomeServicesSection from "../componnets/home/HomeServicesSection";
import HomeSubsidiesSection from "../componnets/home/HomeSubsidiesSection";
import HomeBenefitsSection from "../componnets/home/HomeBenefitsSection";
import HomeProjectsSection from "../componnets/home/HomeProjectsSection";
import HomeTestimonialsSection from "../componnets/home/HomeTestimonialsSection";
import HomeCTASection from "../componnets/home/HomeCTASection";

export default function Home() {
    return (
        <div>
            <HomeHeroSection />
            <HomeTrustSection />
            <HomeServicesSection />
            <HomeSubsidiesSection />
            <HomeBenefitsSection />
            <HomeProjectsSection />
            <HomeTestimonialsSection />
            <HomeCTASection />
        </div>
    );
}

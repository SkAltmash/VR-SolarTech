import SEO from "../componnets/SEO";
import HomeHeroSection from "../componnets/home/HomeHeroSection";
import HomeTrustSection from "../componnets/home/HomeTrustSection";
import HomeLogosSection from "../componnets/home/HomeLogosSection";
import HomeServicesSection from "../componnets/home/HomeServicesSection";
import HomeSubsidiesSection from "../componnets/home/HomeSubsidiesSection";
import HomeBenefitsSection from "../componnets/home/HomeBenefitsSection";
import HomeProjectsSection from "../componnets/home/HomeProjectsSection";
import HomeTestimonialsSection from "../componnets/home/HomeTestimonialsSection";
import HomeBlogSection from "../componnets/home/HomeBlogSection";
import HomeCTASection from "../componnets/home/HomeCTASection";

export default function Home() {
    return (
        <div>
            <SEO
                title="Premium Solar Solutions"
                description="Leading solar EPC company in Maharashtra providing high-quality rooftop solar installations for residential, commercial & industrial needs. Get up to 90% savings."
                keywords="solar installation, rooftop solar, solar EPC, Maharashtra solar, industrial solar, commercial solar panels"
            />
            <HomeHeroSection />
            <HomeTrustSection />
            <HomeLogosSection />
            <HomeServicesSection />
            <HomeSubsidiesSection />
            <HomeBenefitsSection />
            <HomeProjectsSection />
            <HomeTestimonialsSection />
            <HomeBlogSection />
            <HomeCTASection />
        </div>
    );
}

import { motion } from "framer-motion";
import { Handshake } from "lucide-react";
import "./HomeLogosSection.css";

const LOGOS = [
    { src: "/logos/Adani.webp", alt: "Adani" },
    { src: "/logos/tata.png", alt: "Tata" },
    { src: "/logos/ult.jpeg", alt: "ULT" },
    { src: "/logos/waree.png", alt: "Waree" },
    { src: "/logos/vguard.webp", alt: "Vguard" },
    { src: "/logos/Polycab.png", alt: "Polycab" }
];

// Triple for seamless infinite loop on all screen sizes
const displayLogos = [...LOGOS, ...LOGOS, ...LOGOS];

export default function HomeLogosSection() {
    return (
        <section className="py-16 bg-[#f8fafc] overflow-hidden border-b border-slate-100">
            <div className="max-w-6xl mx-auto px-5">

                {/* Header — mirrors HomeServicesSection style */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] mb-4 border border-orange-200">
                        <Handshake size={12} />
                        Our Partners
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Trusted by <span className="text-orange-500">Industry Leaders</span>
                    </h2>
                </motion.div>
            </div>

            {/* Full-width scrolling strip */}
            <div className="logos-wrapper relative">
                {/* Fade edges matching bg-[#f8fafc] */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-48 z-10"
                    style={{ background: "linear-gradient(to right, #f8fafc, transparent)" }} />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-48 z-10"
                    style={{ background: "linear-gradient(to left, #f8fafc, transparent)" }} />

                <div className="logos-track-container overflow-hidden">
                    <div className="logos-track">
                        {displayLogos.map((logo, i) => (
                            <div key={i} className="logo-item group shrink-0 flex items-center justify-center px-10 md:px-16 h-20">
                                <img
                                    src={logo.src}
                                    alt={logo.alt}
                                    className="h-15 md:h-18 w-auto object-contain rounded-2xl"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
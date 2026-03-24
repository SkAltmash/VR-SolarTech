import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sun, ArrowRight, Star, ShieldCheck, Zap, MousePointerClick } from "lucide-react";

export default function HomeHeroSection() {
    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-8 bg-slate-950 selection:bg-orange-500/30">

            {/* --- PRO BACKGROUND LAYER --- */}
            <div className="absolute inset-0 z-0">
                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.15]"
                    style={{ backgroundImage: `radial-gradient(#f97316 0.5px, transparent 0.5px)`, backgroundSize: '30px 30px' }} />

                {/* Glowing Blobs */}
                <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px]" />

                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
            </div>

            {/* --- CONTENT --- */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-12 text-center"
            >
                {/* Animated Badge */}
                <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 p-1.5 pr-4 rounded-full mb-8 group hover:border-orange-500/50 transition-colors">
                    <span className="bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">New</span>
                    <span className="text-slate-300 text-xs font-bold tracking-wide flex items-center gap-1">
                        <Star size={12} className="fill-orange-500 text-orange-500" />
                        5-Star Rated Solar Installer in Maharashtra
                    </span>
                </motion.div>

                {/* Main Headline */}
                <motion.h1 variants={itemVariants} className="text-5xl sm:text-8xl font-black text-white leading-[0.95] tracking-tighter mb-8">
                    Switch to Solar. <br />
                    <span className="relative inline-block">
                        Save <span className="text-orange-500 italic">90%</span> Daily.
                        <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 358 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 9C118.5 2.5 239.5 2.5 355 9" stroke="#f97316" strokeWidth="5" strokeLinecap="round" />
                        </svg>
                    </span>
                </motion.h1>

                {/* Description */}
                <motion.p variants={itemVariants} className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
                    Experience energy independence with **VR SolarTech**.
                    Premium panels, government subsidies, and professional installation—all under one roof.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-20">
                    <Link
                        to="/contact"
                        className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-orange-500 text-white font-black rounded-2xl shadow-[0_20px_50px_rgba(249,115,22,0.3)] hover:bg-orange-600 hover:-translate-y-1 active:scale-95 transition-all text-lg overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        Get Free Quote
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                        to="/services"
                        className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all text-lg backdrop-blur-sm"
                    >
                        <Zap size={20} className="text-orange-500" />
                        Services
                    </Link>
                </motion.div>

                {/* Trust Row */}
                <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-12"
                >
                    {[
                        { icon: ShieldCheck, label: "MNRE Approved", sub: "Govt. Vendor" },
                        { icon: Star, label: "5-Star Rated", sub: "Google & Justdial" },
                        { icon: Sun, label: "25-Yr Warranty", sub: "Long-term Peace" },
                        { icon: MousePointerClick, label: "Zero Hassle", sub: "End-to-end Service" },
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col items-center group">
                            <stat.icon size={24} className="text-slate-500 mb-3 group-hover:text-orange-500 transition-colors" />
                            <span className="text-white font-black text-sm uppercase tracking-widest">{stat.label}</span>
                            <span className="text-slate-500 text-[10px] font-bold uppercase mt-1">{stat.sub}</span>
                        </div>
                    ))}
                </motion.div>

            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-orange-500 to-transparent" />
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">Scroll</span>
            </motion.div>

        </section>
    );
}
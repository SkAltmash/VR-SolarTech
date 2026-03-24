import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, PhoneCall, Zap, CheckCircle2, MessageSquare } from "lucide-react";

export default function HomeCTASection() {
    return (
        <section className="relative py-24 bg-slate-950 overflow-hidden">
            {/* --- PRO BACKGROUND DESIGN --- */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500 rounded-full blur-[150px]" />
                {/* Subtle Grid Pattern Overlay */}
                <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative rounded-[3rem] bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 p-10 md:p-20 text-center text-white shadow-[0_40px_100px_rgba(249,115,22,0.4)] overflow-hidden group"
                >
                    {/* Floating Decorative Icon */}
                    <Zap className="absolute -top-10 -left-10 w-40 h-40 text-white/10 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                    <SunIcon className="absolute -bottom-10 -right-10 w-48 h-48 text-white/10 group-hover:scale-110 transition-transform duration-700" />

                    <div className="relative z-10">
                        {/* Animated Badge */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-5 py-2 rounded-full mb-8"
                        >
                            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Special March Offer</span>
                        </motion.div>

                        <h2 className="text-4xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter">
                            Ready to <span className="italic">Slash</span> Your <br />
                            Electricity Bill?
                        </h2>

                        <p className="text-orange-50/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
                            Join **500+ families** in Maharashtra who switched to solar.
                            Start your journey with a **free technical site survey** today.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
                            {/* Primary CTA */}
                            <Link
                                to="/contact"
                                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-orange-600 font-black rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 transition-all text-lg overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-orange-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="relative z-10 flex items-center gap-3">
                                    Get Free Consultation <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>

                            {/* Secondary CTA */}
                            <a
                                href="tel:+919545966868"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-slate-900/20 backdrop-blur-md border-2 border-white/30 text-white font-black rounded-2xl hover:bg-white hover:text-orange-600 transition-all text-lg"
                            >
                                <PhoneCall size={20} />
                                Call Now
                            </a>
                        </div>

                        {/* Conversion Micro-Copy */}
                        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 opacity-70">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                                <CheckCircle2 size={14} /> No Hidden Costs
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                                <MessageSquare size={14} /> Response Under 2hrs
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                                <Zap size={14} /> Govt. Subsidy Applied
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// Simple internal icon for decoration
function SunIcon({ className }) {
    return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    );
}
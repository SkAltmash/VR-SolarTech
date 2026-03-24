import { Star, Quote, CheckCircle2, Zap, ArrowUpRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
    {
        name: "Rohit Patil",
        location: "Navi Mumbai",
        text: "The team handled everything from the initial site survey to the final government subsidy paperwork. My monthly electricity bill is now almost zero. Highly recommended!",
        rating: 5,
        source: "Justdial"
    },
    {
        name: "Sneha Joshi",
        location: "Thane",
        text: "Very clean installation and professional support throughout. The ROI calculator estimate on their website was extremely accurate. A great investment for our home.",
        rating: 5,
        source: "Justdial"
    },
    {
        name: "Amit Deshmukh",
        location: "Karjat",
        text: "Excellent experience with VR SolarTech. Fast installation, transparent pricing, and the staff is very knowledgeable about the latest MNRE guidelines.",
        rating: 5,
        source: "Justdial"
    },
];

export default function HomeTestimonialsSection() {
    return (
        <section className="py-24 bg-[#f8fafc] overflow-hidden">
            <div className="max-w-6xl mx-auto px-5">

                {/* --- HEADER & JUSTDIAL BADGE --- */}
                <div className="flex flex-col items-center text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="mb-6 flex items-center gap-4 bg-white px-6 py-3 rounded-2xl shadow-xl shadow-blue-500/5 border border-blue-100"
                    >
                        <div className="flex flex-col items-start leading-none">
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Top Rated On</span>
                            <span className="text-xl font-black text-slate-900 tracking-tighter italic">Justdial</span>
                        </div>
                        <div className="h-8 w-px bg-slate-200 mx-1" />
                        <div className="flex flex-col items-center">
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} className="text-[#ff9000] fill-[#ff9000]" />
                                ))}
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase">5.0 / 5.0 Rating</span>
                        </div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight"
                    >
                        Trusted by <span className="text-orange-500">Hundreds</span> <br className="sm:hidden" /> of Homeowners
                    </motion.h2>
                </div>

                {/* --- TESTIMONIALS CARDS (MOBILE SCROLL) --- */}
                <div className="relative">
                    <div className="
                        flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 pb-10 
                        md:grid md:grid-cols-3 md:overflow-visible md:pb-0
                    ">
                        {testimonials.map((item, index) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="
                                    flex-shrink-0 w-[87%] snap-center
                                    md:w-full md:snap-align-none
                                    bg-white rounded-[2.5rem] p-10 border border-slate-100 
                                    shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-blue-500/10 
                                    transition-all duration-500 group relative
                                "
                            >
                                {/* Quote Icon */}
                                <Quote className="absolute top-8 right-10 text-slate-50 opacity-10 group-hover:text-blue-50 group-hover:opacity-100 transition-all" size={64} />

                                {/* Justdial Verification Tag */}
                                <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1 rounded-full mb-6 border border-blue-100">
                                    <CheckCircle2 size={12} fill="currentColor" className="text-white" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Verified on Justdial</span>
                                </div>

                                {/* Stars */}
                                <div className="flex gap-1 mb-6 relative z-10">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={18} className="text-[#ff9000] fill-[#ff9000]" />
                                    ))}
                                </div>

                                {/* Text */}
                                <p className="text-slate-600 leading-relaxed font-medium mb-8 relative z-10 italic">
                                    "{item.text}"
                                </p>

                                {/* Footer Profile */}
                                <div className="flex items-center gap-4 border-t border-slate-50 pt-6 relative z-10">
                                    <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center font-black text-slate-400 text-lg group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                                        {item.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-black text-slate-900 text-base">{item.name}</p>
                                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                                            {item.location} • Solar Client
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* --- CALL TO ACTION --- */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-16 text-center"
                >

                </motion.div>

            </div>

            {/* CSS Injection for scrollbar hiding */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}} />
        </section>
    );
}
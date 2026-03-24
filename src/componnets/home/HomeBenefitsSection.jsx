import { motion } from "framer-motion";
import { ShieldCheck, Zap, Wallet, Headphones, CheckCircle2 } from "lucide-react";

const benefits = [
    {
        icon: Wallet,
        title: "Up to 90% Bill Reduction",
        desc: "Slash monthly electricity bills with high-efficiency rooftop systems.",
        accent: "from-orange-500 to-amber-500",
    },
    {
        icon: ShieldCheck,
        title: "Long-Term Warranty",
        desc: "Reliable products with strong performance and service coverage.",
        accent: "from-blue-500 to-indigo-500",
    },
    {
        icon: Zap,
        title: "Subsidy Assistance",
        desc: "End-to-end support for subsidy and net-metering paperwork.",
        accent: "from-yellow-400 to-orange-400",
    },
    {
        icon: Headphones,
        title: "After-Sales Support",
        desc: "Fast response from survey to installation and ongoing maintenance.",
        accent: "from-emerald-500 to-teal-500",
    },
];

export default function HomeBenefitsSection() {
    return (
        <section className="relative py-24 bg-[#f8fafc] overflow-hidden">
            {/* Subtle Background Decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-orange-50 rounded-full blur-[120px] -mr-20 -mt-20 opacity-60" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* --- SECTION HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2 mb-4"
                        >
                            <span className="w-8 h-[2px] bg-orange-500 rounded-full" />
                            <span className="text-orange-600 text-xs font-black uppercase tracking-[0.3em]">
                                Value Proposition
                            </span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight"
                        >
                            Why Homeowners Trust <br />
                            <span className="text-orange-500">VR SolarTech</span>
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-slate-500 font-medium max-w-sm border-l-4 border-slate-200 pl-6 hidden lg:block"
                    >
                        We don't just install panels; we deliver energy independence with zero-hassle maintenance.
                    </motion.p>
                </div>

                {/* --- BENEFITS GRID --- */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map(({ icon: Icon, title, desc, accent }, i) => (
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="group relative bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 flex flex-col items-start"
                        >
                            {/* Decorative Corner Glow */}
                            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${accent} opacity-0 group-hover:opacity-5 rounded-tr-[2.5rem] transition-opacity blur-2xl`} />

                            {/* Icon Container */}
                            <div className="relative mb-8">
                                <div className={`w-16 h-16 bg-gradient-to-br ${accent} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                    <Icon size={28} className="text-white" strokeWidth={2.5} />
                                </div>
                                {/* Live Support Pulse (for the Support card) */}
                                {title.includes("Support") && (
                                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
                                    </span>
                                )}
                            </div>

                            {/* Content */}
                            <h3 className="font-black text-slate-900 text-xl mb-4 leading-tight group-hover:text-orange-500 transition-colors">
                                {title}
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium mb-8">
                                {desc}
                            </p>

                            {/* Bottom CTA / Tag */}
                            <div className="mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-4 py-2 rounded-full group-hover:bg-orange-50 group-hover:text-orange-600 transition-all">
                                <CheckCircle2 size={14} />
                                Verified Solution
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* --- PRO FOOTNOTE --- */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-16 text-center"
                >
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-[0.2em]">
                        Join <span className="text-orange-500">500+ Happy Families</span> Saving Every Month
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
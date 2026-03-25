import { motion } from "framer-motion";
import {
    Banknote, Leaf, Building2, Users, Factory,
    CircleCheck, CheckCircle2, Info, ArrowRight, Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";

const subsidiesData = {
    schemes: [
        {
            title: "PM Surya Ghar Muft Bijli Yojana",
            type: "Residential",
            subsidy: [
                { capacity: "1 kW", amount: "₹30,000" },
                { capacity: "2 kW", amount: "₹60,000" },
                { capacity: "3 kW+", amount: "₹78,000 (Fixed)" },
            ],
            benefit: "Subsidy credited directly to your bank account after installation.",
        },
        {
            title: "PM KUSUM Yojana",
            type: "Agriculture",
            subsidy: "Up to 90%",
            features: [
                "Kisan Solar Pumps",
                "Solar Power Plants",
                "For Irrigation Pumps",
                "Replaces Diesel Costs",
            ],
            support: "Eligibility verification & documentation for farmers.",
        },
        {
            title: "Net-Metering Rules",
            type: "General",
            features: [
                "Export excess solar power",
                "Get credit in electricity bill",
                "Zero bill possibility",
            ],
            benefit: "Earn from your roof even when you aren't home.",
        },
        {
            title: "Industrial Policy",
            type: "Commercial",
            features: [
                "Electricity duty exemptions",
                "Stamp duty rebates",
                "10-year tax benefits",
            ],
            for: "Large projects, factories, and captive generation.",
        },
        {
            title: "RWA & Societies",
            type: "Community",
            features: [
                "Bulk subsidy advantages",
                "Common area lighting",
                "Net-metering for shared energy",
            ],
            result: "Drastically lower maintenance bills for residents.",
        },
        {
            title: "State Initiatives",
            type: "Policy",
            features: [
                "Renewable Energy Policy",
                "Skill development for youth",
                "Loans for up to 10kW setups",
            ],
            focus: "Creating a trained workforce for the solar ecosystem.",
        },
    ],
};

const typeIcon = {
    Residential: Banknote,
    Agriculture: Leaf,
    General: CircleCheck,
    Policy: Building2,
    Commercial: Factory,
    Community: Users,
};

const typeColors = {
    Residential: "bg-orange-50 text-orange-600 border-orange-100",
    Agriculture: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Commercial: "bg-blue-50 text-blue-600 border-blue-100",
    Community: "bg-purple-50 text-purple-600 border-purple-100",
    General: "bg-slate-50 text-slate-600 border-slate-100",
    Policy: "bg-amber-50 text-amber-600 border-amber-100",
};

export default function HomeSubsidiesSection() {
    return (
        <section className="relative py-24 bg-[#f8fafc] overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-orange-100 rounded-full blur-[120px] -mr-48 opacity-40 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* --- HEADER --- */}
                <div className="flex flex-col items-center text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100 mb-6"
                    >
                        <Sparkles size={12} className="text-orange-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                            Govt. Financial Aid
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tighter leading-tight"
                    >
                        Solar <span className="text-orange-500">Subsidies</span> <br className="hidden sm:block" />
                        & Schemes 2026
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-slate-500 font-medium mt-6 max-w-2xl mx-auto text-lg leading-relaxed"
                    >
                        Save big with direct benefit transfers and policy exemptions.
                        VR SolarTech provides **end-to-end documentation support** for all schemes.
                    </motion.p>
                </div>

                {/* --- SCHEMES GRID --- */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {subsidiesData.schemes.map((scheme, index) => {
                        const Icon = typeIcon[scheme.type] || CircleCheck;
                        return (
                            <motion.div
                                key={scheme.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 flex flex-col group relative overflow-hidden"
                            >
                                {/* Category Badge */}
                                <div className="flex items-start justify-between mb-8">
                                    <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                        <Icon size={24} strokeWidth={2.5} />
                                    </div>
                                    <span className={`text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border shadow-sm ${typeColors[scheme.type] || typeColors.General}`}>
                                        {scheme.type}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="font-black text-slate-900 text-2xl mb-6 tracking-tight leading-tight group-hover:text-orange-500 transition-colors">
                                    {scheme.title}
                                </h3>

                                {/* Subsidy Visuals */}
                                {Array.isArray(scheme.subsidy) ? (
                                    <div className="bg-slate-50 rounded-3xl p-5 border border-slate-100 mb-6">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Info size={14} className="text-slate-400" />
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Fixed Subsidy Slab</p>
                                        </div>
                                        <div className="space-y-3">
                                            {scheme.subsidy.map((item) => (
                                                <div key={item.capacity} className="flex items-center justify-between text-sm font-bold text-slate-700">
                                                    <span className="flex items-center gap-2">
                                                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                                                        {item.capacity}
                                                    </span>
                                                    <span className="text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">{item.amount}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    scheme.subsidy && (
                                        <div className="bg-emerald-500 rounded-2xl p-5 text-white mb-6 shadow-lg shadow-emerald-100 flex items-center justify-between">
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Direct Benefit</p>
                                                <p className="text-2xl font-black">{scheme.subsidy}</p>
                                            </div>
                                            <div className="bg-white/20 p-2 rounded-xl">
                                                <Banknote size={24} />
                                            </div>
                                        </div>
                                    )
                                )}

                                {/* Features / Benefits */}
                                <div className="space-y-4 mb-8">
                                    {scheme.features?.map((feature) => (
                                        <div key={feature} className="flex items-start gap-3">
                                            <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                                            <p className="text-sm text-slate-600 font-semibold leading-relaxed">
                                                {feature}
                                            </p>
                                        </div>
                                    ))}

                                    {(scheme.benefit || scheme.support || scheme.focus || scheme.for || scheme.result) && (
                                        <div className="pt-4 border-t border-slate-50">
                                            <p className="text-xs text-slate-700 leading-relaxed italic">
                                                <span className="text-orange-500 font-black not-italic uppercase tracking-tighter mr-1">Impact:</span>
                                                {scheme.benefit || scheme.support || scheme.focus || scheme.for || scheme.result}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Footer Link */}
                                <div className="mt-auto">
                                    <Link className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-orange-600 transition-colors">
                                        Check Eligibility <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* --- PRO FOOTNOTE --- */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-20 bg-slate-900 rounded-[2.5rem] p-8 sm:rounded-[3rem] sm:p-10 text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px]" />
                    <h4 className="text-white text-xl sm:text-2xl font-black mb-4 relative z-10">Confused about the documentation?</h4>
                    <p className="text-slate-400 mb-8 max-w-xl mx-auto relative z-10 font-medium leading-relaxed">
                        Our experts handle the entire application process for you — from registration to final disbursement.
                    </p>
                    <Link
                        to="/contact"
                        className="relative z-10 inline-flex w-full max-w-[260px] items-center justify-center rounded-2xl bg-orange-500 px-6 py-4 text-center text-sm sm:w-auto sm:max-w-none sm:px-10 sm:text-base font-black text-white shadow-xl shadow-orange-900/20 transition-all hover:bg-orange-600 active:scale-95"
                    >
                        Talk to a Subsidy Expert
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

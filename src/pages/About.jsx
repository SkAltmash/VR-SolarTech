import { Sun, Users, Award, MapPin, CheckCircle2, Zap, ShieldCheck, Headphones } from "lucide-react";
import { motion } from "framer-motion";
import SEO from "../componnets/SEO";

const whyChooseUs = [
    { icon: Zap, title: "90% Savings", desc: "Reduce your monthly electricity bills by up to 90% with our high-efficiency systems." },
    { icon: ShieldCheck, title: "25-Year Warranty", desc: "Long-term peace of mind with premium solar panel performance warranties." },
    { icon: Award, title: "Subsidy Support", desc: "Complete assistance with government solar subsidies and documentation." },
    { icon: Headphones, title: "Expert Support", desc: "Reliable after-sales service and maintenance from a 5-star rated team." },
];

export default function About() {
    return (
        <div className="min-h-screen bg-[#fcfcfd] pt-28 pb-20 font-sans text-slate-700">
            <SEO
                title="About Us"
                description="VR SolarTech is a premier solar EPC company in Maharashtra. We provide complete end-to-end solar solutions with 25-year warranties."
                keywords="about VR SolarTech, solar company Maharashtra, solar team, solar subsidy"
            />
            <div className="max-w-6xl mx-auto px-5">

                {/* --- SEO HERO SECTION --- */}
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block bg-orange-100 text-orange-600 text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-[0.2em] mb-6 border border-orange-200"
                    >
                        About VR SolarTech
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-6xl font-black text-slate-900 mb-8 leading-[1.1]"
                    >
                        Leading <span className="text-orange-500">Solar Company</span> <br />
                        in Maharashtra
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed font-medium"
                    >
                        **VR SolarTech** is a premier **solar EPC company in Maharashtra**, providing high-quality and cost-effective **rooftop solar installation services** for residential, commercial, and industrial customers.
                    </motion.p>
                </div>

                {/* --- CORE CONTENT GRID --- */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-black text-slate-900">Empowering Maharashtra with <span className="text-orange-500">Clean Energy</span></h2>
                        <div className="space-y-4 text-base leading-relaxed">
                            <p>
                                We specialise in designing and installing efficient solar power systems that help you **reduce electricity bills by up to 90%** while promoting sustainable energy. As a trusted **solar company in Karjat, Thane, Navi Mumbai, Pune, and Nashik**, we deliver complete end-to-end solutions.
                            </p>
                            <p>
                                Our team ensures a seamless experience from **free site surveys** to final commissioning. Whether you need **On-Grid Solar Systems** for net metering or **Hybrid Solar Systems** for battery backup, we tailor every project to maximise efficiency and long-term savings.
                            </p>
                        </div>

                        <div className="pt-4 grid grid-cols-2 gap-4">
                            {["On-Grid Solar", "Off-Grid Solutions", "Hybrid Systems", "Industrial EPC"].map((item) => (
                                <div key={item} className="flex items-center gap-2 font-bold text-slate-800">
                                    <CheckCircle2 size={18} className="text-orange-500" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
                            <Sun className="absolute -top-10 -right-10 text-orange-500/20 w-64 h-64" />
                            <div className="relative z-10">
                                <h3 className="text-4xl font-black mb-4">5-Star Rated</h3>
                                <p className="text-slate-400 font-medium mb-8">Trusted by hundreds of customers on Google & Justdial for quality and reliability.</p>
                                <div className="space-y-6">
                                    <div className="flex items-end gap-4">
                                        <span className="text-6xl font-black text-orange-500 line-height-1">25</span>
                                        <span className="text-sm font-bold uppercase tracking-widest text-slate-300 pb-2">Year Solar Panel <br /> Warranty</span>
                                    </div>
                                    <div className="h-px bg-white/10 w-full" />
                                    <p className="text-orange-100 italic font-medium">"Achieving energy independence for every home and business in Maharashtra."</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- WHY CHOOSE US GRID --- */}
                <div className="mb-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-slate-900">Why VR SolarTech?</h2>
                        <p className="text-slate-500 font-medium">Professional **solar installers** with a focus on quality assurance.</p>
                    </div>
                    <div className="grid md:grid-cols-4 gap-6">
                        {whyChooseUs.map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6">
                                    <Icon size={28} className="text-orange-500" />
                                </div>
                                <h3 className="font-black text-slate-900 text-lg mb-3">{title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed font-medium">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- SERVICE AREAS (SEO TARGETING) --- */}
                <div className="bg-slate-900 rounded-[3rem] p-10 sm:p-16 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                    <div className="relative z-10">
                        <MapPin size={48} className="text-orange-500 mx-auto mb-6" />
                        <h2 className="text-white text-3xl font-black mb-6">Solar Installation Near You</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                            If you are searching for a **“solar company near me”**, **VR SolarTech** is your trusted local partner. We provide expert services across:
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {["Karjat", "Thane", "Mulund", "Navi Mumbai", "Panvel", "Murbad", "Alibag", "Pen", "Pune", "Nashik"].map((city) => (
                                <span key={city} className="bg-white/10 text-white px-6 py-2 rounded-full font-bold text-sm border border-white/10 hover:bg-orange-500 transition-colors cursor-default">
                                    {city}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- MISSION STATEMENT --- */}
                <div className="mt-24 text-center max-w-3xl mx-auto">
                    <h2 className="text-2xl font-black text-slate-900 mb-6 underline decoration-orange-500 decoration-4 underline-offset-8">Our Mission</h2>
                    <p className="text-lg text-slate-600 leading-relaxed font-medium italic">
                        "Our mission is to make **solar energy accessible and affordable** for every household and business. We aim to help customers achieve energy independence, reduce electricity costs, and contribute to a greener environment through reliable **solar solutions**."
                    </p>
                </div>

            </div>
        </div>
    );
}
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { ArrowRight, Sun, Zap, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const sortByPosition = (items) =>
    [...items].sort((a, b) => {
        const aPos = Number.isFinite(Number(a.position)) ? Number(a.position) : 9999;
        const bPos = Number.isFinite(Number(b.position)) ? Number(b.position) : 9999;
        if (aPos !== bPos) return aPos - bPos;
        return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
    });

export default function HomeServicesSection() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "services"), (snap) => {
            setServices(sortByPosition(snap.docs.map((d) => ({ id: d.id, ...d.data() }))).slice(0, 3));
            setLoading(false);
        });
        return unsub;
    }, []);

    return (
        <section className="py-20 bg-[#f8fafc] overflow-hidden">
            <div className="max-w-6xl mx-auto px-5">

                {/* --- HEADER --- */}
                <div className="flex items-end justify-between gap-4 mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] mb-4 border border-orange-200">
                            <Zap size={12} fill="currentColor" />
                            Our Expertise
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                            Solar Solutions <br />
                            <span className="text-orange-500">For Every Need</span>
                        </h2>
                    </motion.div>

                    <Link to="/services" className="group hidden sm:flex items-center gap-2 text-slate-900 font-black text-sm uppercase tracking-widest hover:text-orange-600 transition-colors">
                        View All Services
                        <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all shadow-sm">
                            <ArrowRight size={14} />
                        </div>
                    </Link>
                </div>

                {/* --- SERVICES CONTAINER (MOBILE SCROLL / DESKTOP GRID) --- */}
                <div className="relative">
                    <div className="
                        flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-5 pb-10 
                        sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible sm:pb-0
                    ">
                        {loading ? (
                            Array(3).fill(0).map((_, i) => (
                                <div key={i} className="flex-shrink-0 w-[85%] sm:w-full bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm animate-pulse">
                                    <div className="w-full aspect-[4/3] sm:h-48 sm:aspect-auto bg-slate-100 rounded-3xl mb-6" />
                                    <div className="w-2/3 h-6 bg-slate-100 rounded-lg mb-3" />
                                    <div className="w-full h-4 bg-slate-100 rounded-lg mb-2" />
                                    <div className="w-5/6 h-4 bg-slate-100 rounded-lg" />
                                </div>
                            ))
                        ) : (
                            services.map((s, index) => (
                                <motion.div
                                    key={s.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="
                                        flex-shrink-0 w-[82vw] max-w-[320px] snap-center
                                        sm:w-full sm:snap-align-none
                                        bg-white rounded-[2.5rem] p-8 border border-slate-100 
                                        shadow-sm hover:shadow-2xl hover:shadow-orange-500/10 
                                        hover:-translate-y-2 transition-all duration-500 group relative
                                    "
                                >
                                    {/* Tag */}
                                    <div className="absolute top-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="bg-orange-50 text-orange-500 p-2 rounded-xl">
                                            <ArrowRight size={18} />
                                        </div>
                                    </div>

                                    {/* Visual/Icon */}
                                    {s.image ? (
                                        <div className="w-full aspect-[4/3] sm:h-48 sm:aspect-auto rounded-[1.5rem] mb-7 overflow-hidden relative shadow-inner">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                                            <img
                                                src={s.image}
                                                alt={s.title}
                                                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>
                                    ) : (
                                        <div className={`w-16 h-16 bg-gradient-to-br ${s.gradient || "from-orange-400 to-amber-500"} rounded-2xl flex items-center justify-center mb-7 shadow-lg shadow-orange-500/20`}>
                                            <Sun size={32} className="text-white" strokeWidth={2.5} />
                                        </div>
                                    )}

                                    {/* Content */}
                                    <h3 className="font-black text-slate-900 text-2xl mb-3 leading-tight tracking-tight">
                                        {s.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed font-medium mb-6">
                                        {s.desc}
                                    </p>

                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-orange-500 transition-colors">
                                        <ShieldCheck size={14} />
                                        Govt. Subsidy Available
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>

                {/* --- MOBILE ONLY CTA --- */}
                <div className="mt-8 flex justify-center sm:hidden">
                    <Link to="/services" className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-slate-200 active:scale-95 transition-all">
                        Explore All Solutions
                        <ArrowRight size={16} className="text-orange-500" />
                    </Link>
                </div>

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

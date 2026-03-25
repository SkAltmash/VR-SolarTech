import { useState, useEffect, useMemo } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../firebase";
import { Sun, MapPin, Zap, Leaf, Filter, LayoutGrid, CheckCircle2 } from "lucide-react";
import SEO from "../componnets/SEO";

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState("All");

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "projects"), (snap) => {
            const sorted = snap.docs
                .map((d) => ({ id: d.id, ...d.data() }))
                .sort((a, b) => {
                    const aPos = Number.isFinite(Number(a.position)) ? Number(a.position) : 9999;
                    const bPos = Number.isFinite(Number(b.position)) ? Number(b.position) : 9999;
                    if (aPos !== bPos) return aPos - bPos;
                    return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
                });
            setProjects(sorted);
            setLoading(false);
        });
        return unsub;
    }, []);

    // Filter Logic
    const filteredProjects = useMemo(() => {
        if (activeFilter === "All") return projects;
        return projects.filter(p => p.type?.toLowerCase().includes(activeFilter.toLowerCase()));
    }, [projects, activeFilter]);

    const categories = ["All", "Residential", "Commercial", "Industrial"];

    return (
        <div className="min-h-screen bg-[#f8fafc] pt-32 pb-24 font-sans selection:bg-orange-100">
            <SEO
                title="Our Projects"
                description="Explore our portfolio of successful solar installations across residential, commercial, and industrial sectors."
                keywords="solar projects, solar installations, solar portfolio, commercial solar projects"
            />
            <div className="max-w-7xl mx-auto px-6">

                {/* --- HEADER --- */}
                <div className="flex flex-col items-center text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-[0.2em] mb-6 border border-orange-100"
                    >
                        <LayoutGrid size={12} /> Our Portfolio
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter"
                    >
                        Success <span className="text-orange-500 italic">Stories.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed"
                    >
                        We’ve empowered hundreds of homes and factories across Maharashtra.
                        Explore our latest solar installations and their real-world impact.
                    </motion.p>
                </div>


                {/* --- GRID --- */}
                <motion.div
                    layout
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {loading ? (
                            /* --- PRO SKELETONS --- */
                            Array(6).fill(0).map((_, i) => (
                                <div key={i} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 animate-pulse">
                                    <div className="aspect-[4/3] sm:h-64 sm:aspect-auto bg-slate-100" />
                                    <div className="p-8 space-y-4">
                                        <div className="w-2/3 h-6 bg-slate-100 rounded-lg" />
                                        <div className="w-full h-4 bg-slate-100 rounded-lg" />
                                        <div className="pt-6 grid grid-cols-2 gap-4">
                                            <div className="h-12 bg-slate-50 rounded-2xl" />
                                            <div className="h-12 bg-slate-50 rounded-2xl" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : filteredProjects.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-100"
                            >
                                <Sun size={48} className="mx-auto mb-4 text-slate-200" />
                                <p className="text-xl font-black text-slate-400">No {activeFilter} projects yet.</p>
                                <p className="text-slate-300 font-medium">We're constantly adding new installations.</p>
                            </motion.div>
                        ) : (
                            /* --- REAL DATA CARDS --- */
                            filteredProjects.map((p, index) => (
                                <motion.div
                                    layout
                                    key={p.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 transition-all duration-500 group"
                                >
                                    {/* Image Section */}
                                    <div className="aspect-[4/3] sm:h-64 sm:aspect-auto relative overflow-hidden">
                                        {p.image ? (
                                            <>
                                                <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                                            </>
                                        ) : (
                                            <div className={`absolute inset-0 bg-gradient-to-br ${p.color || "from-slate-800 to-slate-900"} flex items-center justify-center`}>
                                                <Sun size={48} className="text-white/10" />
                                            </div>
                                        )}

                                        {/* Status & Type Badges */}
                                        <div className="absolute top-6 left-6 flex flex-col gap-2">
                                            <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                                                {p.type}
                                            </span>
                                            <div className="bg-emerald-500/90 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1.5 w-fit">
                                                <CheckCircle2 size={10} /> Completed
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-8">
                                        <div className="flex items-center gap-2 text-orange-500 mb-3">
                                            <MapPin size={14} />
                                            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">{p.location}</span>
                                        </div>
                                        <h3 className="font-black text-slate-900 text-2xl mb-6 tracking-tight group-hover:text-orange-500 transition-colors leading-tight">
                                            {p.title}
                                        </h3>

                                        {/* Impact Dashboard */}
                                        <div className="grid grid-cols-2 gap-4 p-5 bg-slate-50 rounded-3xl border border-slate-100 group-hover:bg-orange-50 group-hover:border-orange-100 transition-all duration-300">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-1.5 text-slate-400">
                                                    <Zap size={12} className="group-hover:text-orange-500 transition-colors" />
                                                    <p className="text-[9px] font-black uppercase tracking-widest">Size</p>
                                                </div>
                                                <p className="font-black text-slate-800 text-base">{p.capacity}</p>
                                            </div>
                                            <div className="space-y-1 border-l border-slate-200 pl-4 group-hover:border-orange-200 transition-all">
                                                <div className="flex items-center gap-1.5 text-slate-400">
                                                    <Leaf size={12} className="text-emerald-500" />
                                                    <p className="text-[9px] font-black uppercase tracking-widest">Saved</p>
                                                </div>
                                                <p className="font-black text-emerald-600 text-base">{p.saved}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}

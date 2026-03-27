import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { ArrowRight, Sun, MapPin, Zap, Leaf, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const sortByPosition = (items) =>
    [...items].sort((a, b) => {
        const aPos = Number.isFinite(Number(a.position)) ? Number(a.position) : 9999;
        const bPos = Number.isFinite(Number(b.position)) ? Number(b.position) : 9999;
        if (aPos !== bPos) return aPos - bPos;
        return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
    });

export default function HomeProjectsSection() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "projects"), (snap) => {
            setProjects(sortByPosition(snap.docs.map((d) => ({ id: d.id, ...d.data() }))).slice(0, 3));
            setLoading(false);
        });
        return unsub;
    }, []);

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-6xl mx-auto px-5">

                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] mb-4 border border-emerald-100">
                            <CheckCircle2 size={12} />
                            Proven Success
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                            Recent <br className="sm:hidden" />
                            <span className="text-orange-500 underline decoration-orange-100 underline-offset-8">Installations</span>
                        </h2>
                    </motion.div>

                    <Link to="/projects" className="group hidden sm:flex items-center gap-3 text-slate-900 font-black text-xs uppercase tracking-widest hover:text-orange-600 transition-colors">
                        View Portfolio
                        <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all shadow-sm">
                            <ArrowRight size={16} />
                        </div>
                    </Link>
                </div>

                {/* --- PROJECTS CONTAINER (MOBILE SCROLL / DESKTOP GRID) --- */}
                <div className="relative">
                    <div className="
                        flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-6 pb-10 
                        sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible sm:pb-0
                    ">
                        {loading ? (
                            Array(3).fill(0).map((_, i) => (
                                <div key={i} className="flex-shrink-0 w-[82vw] max-w-[320px] sm:w-full bg-slate-50 rounded-[2.5rem] overflow-hidden animate-pulse">
                                    <div className="aspect-[4/3] sm:h-56 sm:aspect-auto bg-slate-200" />
                                    <div className="p-8">
                                        <div className="w-2/3 h-6 bg-slate-200 rounded-lg mb-3" />
                                        <div className="w-full h-4 bg-slate-200 rounded-lg mb-6" />
                                        <div className="h-10 bg-slate-200 rounded-xl" />
                                    </div>
                                </div>
                            ))
                        ) : (
                            projects.map((p, index) => (
                                <motion.div
                                    key={p.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="
                                        flex-shrink-0 w-[82vw] max-w-[320px] snap-center
                                        sm:w-full sm:snap-align-none
                                        bg-white rounded-[2.5rem] border border-slate-100 
                                        shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-orange-500/10 
                                        hover:-translate-y-2 transition-all duration-500 group overflow-hidden
                                    "
                                >
                                    {/* Image Section */}
                                    <div className="aspect-[4/3] sm:h-56 sm:aspect-auto relative overflow-hidden">
                                        {p.image ? (
                                            <>
                                                <img
                                                    src={p.image}
                                                    alt={p.title}
                                                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                                            </>
                                        ) : (
                                            <div className={`absolute inset-0 bg-gradient-to-br ${p.color || "from-slate-800 to-slate-900"} flex items-center justify-center`}>
                                                <Sun size={48} className="text-white/10" />
                                            </div>
                                        )}

                                        {/* Type Badge */}
                                        <div className="absolute top-5 left-5">
                                            <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                                                {p.type}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-8">
                                        <div className="flex items-center gap-2 text-orange-500 mb-2">
                                            <MapPin size={14} />
                                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{p.location}</span>
                                        </div>
                                        <h3 className="font-black text-slate-900 text-2xl mb-6 tracking-tight leading-tight group-hover:text-orange-500 transition-colors">
                                            {p.title}
                                        </h3>

                                        {/* Stats Grid */}
                                        <div className="grid grid-cols-2 gap-4 p-5 bg-slate-50 rounded-3xl border border-slate-100 group-hover:bg-orange-50 group-hover:border-orange-100 transition-colors">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-1.5 text-slate-400">
                                                    <Zap size={12} className="group-hover:text-orange-500 transition-colors" />
                                                    <p className="text-[9px] font-black uppercase tracking-widest">Capacity</p>
                                                </div>
                                                <p className="font-black text-slate-800 text-base">{p.capacity}</p>
                                            </div>
                                            <div className="space-y-1 border-l border-slate-200 pl-4 group-hover:border-orange-200 transition-colors">

                                                <p className="font-black text-emerald-600 text-base">{p.saved}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>

                {/* --- MOBILE ONLY CTA --- */}
                <div className="mt-10 flex justify-center sm:hidden">
                    <Link to="/projects" className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-slate-200 active:scale-95 transition-all">
                        View All Projects
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

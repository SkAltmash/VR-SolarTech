import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Star, Quote, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../componnets/SEO";

function SkeletonCard() {
    return (
        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl animate-pulse">
            <div className="w-24 h-4 bg-slate-100 rounded-full mb-6" />
            <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <div key={i} className="w-4 h-4 bg-slate-100 rounded-full" />)}
            </div>
            <div className="space-y-2 mb-8">
                <div className="h-3 bg-slate-100 rounded-full w-full" />
                <div className="h-3 bg-slate-100 rounded-full w-5/6" />
                <div className="h-3 bg-slate-100 rounded-full w-4/6" />
            </div>
            <div className="flex items-center gap-4 border-t border-slate-50 pt-6">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl" />
                <div className="space-y-2">
                    <div className="h-3 bg-slate-100 rounded-full w-28" />
                    <div className="h-2 bg-slate-100 rounded-full w-20" />
                </div>
            </div>
        </div>
    );
}

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
                const snap = await getDocs(q);
                setTestimonials(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
            } catch {
                setTestimonials([]);
            } finally {
                setLoading(false);
            }
        };
        fetchTestimonials();
    }, []);

    return (
        <div className="min-h-screen bg-[#f8fafc] pt-28 pb-20 font-sans">
            <SEO
                title="Customer Reviews & Testimonials"
                description="Read what our satisfied customers say about VR SolarTech's solar installation services across Maharashtra."
                keywords="VR SolarTech reviews, solar installation testimonials, customer feedback, solar panel reviews Maharashtra"
            />

            <div className="max-w-6xl mx-auto px-5">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-[0.2em] mb-6 border border-orange-100"
                    >
                        <Star size={12} fill="currentColor" />
                        Verified Customer Reviews
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight mb-5"
                    >
                        What Our{" "}
                        <span className="text-orange-500 underline decoration-orange-200 decoration-8 underline-offset-8">
                            Clients Say
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 text-lg max-w-2xl mx-auto font-medium"
                    >
                        Real reviews from real homeowners and businesses who switched to solar with VR SolarTech.
                    </motion.p>

                    {/* Justdial badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 inline-flex items-center gap-4 bg-white px-6 py-3 rounded-2xl shadow-xl shadow-blue-500/5 border border-blue-100"
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
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                ) : testimonials.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-3xl border border-slate-100">
                        <Loader2 size={40} className="mx-auto mb-4 text-slate-200" />
                        <p className="font-black text-slate-400 text-xl">No reviews yet</p>
                        <p className="text-slate-300 text-sm mt-2">Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {testimonials.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: (index % 3) * 0.1 }}
                                className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group relative"
                            >
                                <Quote className="absolute top-8 right-8 text-slate-50 opacity-10 group-hover:opacity-100 group-hover:text-blue-50 transition-all" size={56} />

                                {item.source && (
                                    <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1 rounded-full mb-6 border border-blue-100">
                                        <CheckCircle2 size={12} fill="currentColor" className="text-white" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Verified on {item.source}</span>
                                    </div>
                                )}

                                <div className="flex gap-1 mb-6 relative z-10">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={18}
                                            className={i < (item.rating || 5) ? "text-[#ff9000] fill-[#ff9000]" : "text-slate-200 fill-slate-200"} />
                                    ))}
                                </div>

                                <p className="text-slate-600 leading-relaxed font-medium mb-8 relative z-10 italic">
                                    "{item.text}"
                                </p>

                                <div className="flex items-center gap-4 border-t border-slate-50 pt-6 relative z-10">
                                    <div className="w-12 h-12 bg-linear-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center font-black text-slate-400 text-lg group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                                        {item.name?.charAt(0) || "?"}
                                    </div>
                                    <div>
                                        <p className="font-black text-slate-900 text-base">{item.name}</p>
                                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                            {item.location} · Solar Client
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* CTA Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 bg-slate-900 rounded-[2.5rem] p-10 text-center relative overflow-hidden"
                >
                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl" />
                    <div className="relative z-10">
                        <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">
                            Ready to Join Our Happy Customers?
                        </h3>
                        <p className="text-slate-400 font-medium mb-8 max-w-xl mx-auto">
                            Get a free site survey and custom solar quote for your home or business today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/contact"
                                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-orange-500/30 transition-all hover:-translate-y-1 text-sm uppercase tracking-widest"
                            >
                                Get Free Quote
                            </Link>
                            <a
                                href="https://wa.me/919545966868"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-green-600 text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-green-500/20 transition-all hover:-translate-y-1 text-sm uppercase tracking-widest"
                            >
                                <MessageCircle size={16} fill="currentColor" />
                                WhatsApp Us
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

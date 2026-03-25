import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Sun } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function Services() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "services"), (snap) => {
            const sorted = snap.docs
                .map((d) => ({ id: d.id, ...d.data() }))
                .sort((a, b) => {
                    const aPos = Number.isFinite(Number(a.position)) ? Number(a.position) : 9999;
                    const bPos = Number.isFinite(Number(b.position)) ? Number(b.position) : 9999;
                    if (aPos !== bPos) return aPos - bPos;
                    return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
                });
            setServices(sorted);
            setLoading(false);
        });
        return unsub;
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-16">
            <Helmet>
                <title>Solar Services | VR Solar Tech</title>
                <meta
                    name="description"
                    content="Explore VR Solar Tech services: rooftop solar (on-grid, off-grid, hybrid), solar street lights, solar CCTV cameras, and solar water pumps."
                />
                <meta
                    name="keywords"
                    content="solar services, rooftop solar, on-grid solar, off-grid solar, hybrid solar, solar street light, solar CCTV camera, solar water pump"
                />
                <link rel="canonical" href="https://vrsolarstech.in/services" />

                <meta property="og:type" content="website" />
                <meta property="og:title" content="Solar Services | VR Solar Tech" />
                <meta
                    property="og:description"
                    content="End-to-end solar services for homes and businesses with professional installation and support."
                />
                <meta property="og:url" content="https://vrsolarstech.in/services" />
                <meta property="og:site_name" content="VR Solar Tech" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Solar Services | VR Solar Tech" />
                <meta
                    name="twitter:description"
                    content="Explore rooftop solar, solar street lights, solar CCTV cameras, and solar water pump solutions."
                />
            </Helmet>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-14">
                    <span className="inline-block bg-orange-100 text-orange-600 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-4">
                        What We Offer
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
                        Our <span className="text-orange-500">Services</span>
                    </h1>
                    <p className="text-slate-500 text-lg max-w-xl mx-auto">
                        End-to-end solar solutions designed for every scale and budget.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        /* Skeleton Loaders */
                        Array(6).fill(0).map((_, i) => (
                            <div key={i} className="bg-white rounded-3xl p-7 border border-slate-100 shadow-sm animate-pulse">
                                <div className="w-full aspect-[4/3] sm:h-40 sm:aspect-auto bg-slate-200 rounded-2xl mb-5" />
                                <div className="w-24 h-6 bg-slate-200 rounded-full mb-3" />
                                <div className="w-3/4 h-6 bg-slate-200 rounded mb-2" />
                                <div className="w-full h-4 bg-slate-200 rounded mb-1" />
                                <div className="w-5/6 h-4 bg-slate-200 rounded" />
                            </div>
                        ))
                    ) : services.length === 0 ? (
                        <div className="col-span-full text-center py-20 text-slate-400">
                            <Sun size={48} className="mx-auto mb-4 opacity-30" />
                            <p className="text-lg font-bold">No services found</p>
                            <p>Check back later for updates.</p>
                        </div>
                    ) : (
                        /* Real Data */
                        services.map((s) => (
                            <div key={s.id} className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group overflow-hidden flex flex-col">

                                {/* Image / Fallback */}
                                {s.image ? (
                                    <div className="w-full aspect-[4/3] sm:h-48 sm:aspect-auto rounded-2xl mb-5 overflow-hidden shadow-md flex-shrink-0">
                                        <img src={s.image} alt={s.title} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                ) : (
                                    <div className={`w-14 h-14 bg-gradient-to-br ${s.gradient || "from-orange-400 to-amber-400"} rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-105 transition-transform flex-shrink-0`}>
                                        <Sun size={26} className="text-white" />
                                    </div>
                                )}

                                {/* Content */}
                                <div className="flex-1 flex flex-col">
                                    {s.badge && (
                                        <div className="mb-3">
                                            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${s.badgeColor || "bg-orange-100 text-orange-600"} inline-block`}>
                                                {s.badge}
                                            </span>
                                        </div>
                                    )}
                                    <h3 className="font-black text-slate-900 text-xl mb-2">{s.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

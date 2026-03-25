import { useState, useEffect } from "react";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "../../firebase";
import { motion } from "framer-motion";
import {
    Settings, FolderKanban, Newspaper, MessageSquare,
    Calculator, Star, TrendingUp, Loader2, Sun
} from "lucide-react";

const statConfig = [
    {
        label: "Services",
        collection: "services",
        icon: Settings,
        color: "from-blue-500 to-blue-600",
        bg: "bg-blue-50",
        text: "text-blue-600",
    },
    {
        label: "Projects",
        collection: "projects",
        icon: FolderKanban,
        color: "from-violet-500 to-violet-600",
        bg: "bg-violet-50",
        text: "text-violet-600",
    },
    {
        label: "Blog Posts",
        collection: "blogs",
        icon: Newspaper,
        color: "from-emerald-500 to-emerald-600",
        bg: "bg-emerald-50",
        text: "text-emerald-600",
    },
    {
        label: "Messages",
        collection: "contacts",
        icon: MessageSquare,
        color: "from-orange-500 to-orange-600",
        bg: "bg-orange-50",
        text: "text-orange-600",
    },
    {
        label: "ROI Submissions",
        collection: "roi_requests",
        icon: Calculator,
        color: "from-amber-500 to-amber-600",
        bg: "bg-amber-50",
        text: "text-amber-600",
    },
    {
        label: "Testimonials",
        collection: "testimonials",
        icon: Star,
        color: "from-pink-500 to-pink-600",
        bg: "bg-pink-50",
        text: "text-pink-600",
    },
];

export default function AdminDashboard() {
    const [counts, setCounts] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const results = await Promise.all(
                    statConfig.map(async (stat) => {
                        try {
                            const snap = await getCountFromServer(collection(db, stat.collection));
                            return { key: stat.collection, count: snap.data().count };
                        } catch {
                            return { key: stat.collection, count: 0 };
                        }
                    })
                );
                const map = {};
                results.forEach(({ key, count }) => { map[key] = count; });
                setCounts(map);
            } catch {
                // silently fail
            } finally {
                setLoading(false);
            }
        };
        fetchCounts();
    }, []);

    return (
        <div>
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200">
                    <TrendingUp size={22} className="text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-black text-slate-900">Dashboard</h1>
                    <p className="text-slate-500 text-sm font-medium">Live overview of your content</p>
                </div>
            </div>

            {/* Welcome Banner */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative bg-slate-900 rounded-3xl p-8 mb-8 overflow-hidden"
            >
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />
                <div className="relative z-10 flex items-center gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-xl shadow-orange-500/30 flex-shrink-0">
                        <Sun size={30} className="text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-white mb-1">Welcome back, Admin 👋</h2>
                        <p className="text-slate-400 text-sm font-medium">
                            VR SolarTech admin panel — manage all your content from one place.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                {statConfig.map((stat, i) => {
                    const Icon = stat.icon;
                    const count = counts[stat.collection];
                    return (
                        <motion.div
                            key={stat.collection}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.07 }}
                            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-300 group"
                        >
                            <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <Icon size={22} className={stat.text} />
                            </div>

                            {loading ? (
                                <div className="flex items-center gap-2 mb-1">
                                    <Loader2 size={18} className="animate-spin text-slate-300" />
                                </div>
                            ) : (
                                <p className="text-4xl font-black text-slate-900 mb-1 tracking-tight">
                                    {count ?? 0}
                                </p>
                            )}

                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                                {stat.label}
                            </p>

                            {/* Colored bottom bar */}
                            <div className={`mt-4 h-1 rounded-full bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                        </motion.div>
                    );
                })}
            </div>

            {/* Footer note */}
            <p className="text-center text-xs text-slate-400 font-medium mt-8">
                Live data from Firebase Firestore · Updated on page load
            </p>
        </div>
    );
}

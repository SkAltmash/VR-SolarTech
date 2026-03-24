import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import {
    Home, Building2, Factory, Mail,
    Building, IndianRupee, Map, MessageCircle, ChevronRight
} from "lucide-react";

// Fallback data
const DEFAULT_DATA_POINTS = [
    { bill: 1000, kw: 2.7, cost: 180000, subsidy: 72600, net: 107400, roi: 3.5 },
    { bill: 2000, kw: 3.0, cost: 190000, subsidy: 78000, net: 112000, roi: 3.3 },
    { bill: 2600, kw: 3.3, cost: 195000, subsidy: 78000, net: 117000, roi: 3.1 },
    { bill: 3200, kw: 3.8, cost: 220000, subsidy: 78000, net: 142000, roi: 3.2 },
    { bill: 3700, kw: 4.3, cost: 245000, subsidy: 78000, net: 167000, roi: 3.4 },
    { bill: 4500, kw: 4.9, cost: 295000, subsidy: 78000, net: 217000, roi: 3.8 },
    { bill: 5000, kw: 5.3, cost: 310000, subsidy: 78000, net: 232000, roi: 3.9 },
    { bill: 6000, kw: 6.5, cost: 380000, subsidy: 78000, net: 302000, roi: 4.0 },
    { bill: 7000, kw: 7.5, cost: 450000, subsidy: 78000, net: 372000, roi: 4.1 },
    { bill: 8000, kw: 8.5, cost: 520000, subsidy: 78000, net: 442000, roi: 4.2 },
    { bill: 9000, kw: 9.5, cost: 590000, subsidy: 78000, net: 512000, roi: 4.3 },
    { bill: 10000, kw: 10.5, cost: 650000, subsidy: 78000, net: 572000, roi: 4.5 },
];

export default function SolarCalculator() {
    const [tab, setTab] = useState("home");
    const [homeBill, setHomeBill] = useState(2600);
    const [dataPoints, setDataPoints] = useState(DEFAULT_DATA_POINTS);
    const [formData, setFormData] = useState({
        companyName: "",
        email: "",
        monthlyBill: "",
        roofArea: 100,
    });

    // Listen to Firestore for ROI data
    useEffect(() => {
        const unsub = onSnapshot(doc(db, "settings", "roiData"), (snap) => {
            if (snap.exists() && snap.data().dataPoints?.length > 0) {
                const sorted = [...snap.data().dataPoints].sort((a, b) => a.bill - b.bill);
                setDataPoints(sorted);
            }
        });
        return unsub;
    }, []);

    const homeMetrics = useMemo(() => {
        const val = homeBill;
        let lower = dataPoints[0];
        let upper = dataPoints[dataPoints.length - 1];

        for (let i = 0; i < dataPoints.length - 1; i++) {
            if (val >= dataPoints[i].bill && val <= dataPoints[i + 1].bill) {
                lower = dataPoints[i];
                upper = dataPoints[i + 1];
                break;
            }
        }

        const ratio = (val - lower.bill) / (upper.bill - lower.bill || 1);
        const interpolate = (l, u) => l + (u - l) * ratio;

        return {
            kw: interpolate(lower.kw, upper.kw).toFixed(1),
            cost: Math.round(interpolate(lower.cost, upper.cost)),
            subsidy: Math.round(interpolate(lower.subsidy, upper.subsidy)),
            net: Math.round(interpolate(lower.net, upper.net)),
            roi: interpolate(lower.roi, upper.roi).toFixed(1)
        };
    }, [homeBill, dataPoints]);

    const capacity = +(formData.roofArea / 90).toFixed(1);

    return (
        <div className="w-full bg-white font-sans">

            {/* Header */}
            <div className="pt-6 pb-4 text-center px-4">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Solar Estimator</h2>
                <p className="text-slate-500 mt-1 text-sm font-medium">Precision calculations for your energy future</p>
            </div>

            {/* Tabs */}
            <div className="flex p-1.5 bg-slate-100 rounded-2xl mx-4 mb-6 border border-slate-200">
                {[
                    { id: "home", label: "Home", icon: Home },
                    { id: "commercial", label: "Commercial", icon: Building2 },
                    { id: "industrial", label: "Industrial", icon: Factory },
                ].map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        onClick={() => setTab(id)}
                        className={`flex-1 flex items-center justify-center gap-1.5 px-2 sm:px-6 py-2.5 rounded-xl font-bold transition-all duration-300 text-xs sm:text-sm ${tab === id
                            ? "bg-white text-orange-600 shadow-sm scale-[1.02]"
                            : "text-slate-500 hover:text-slate-700"
                            }`}
                    >
                        <Icon size={15} strokeWidth={2.5} />
                        {label}
                    </button>
                ))}
            </div>

            <div className="px-4 pb-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={tab}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25 }}
                    >
                        {tab === "home" ? (
                            <div className="grid md:grid-cols-2 gap-6 items-center">
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between items-end mb-3">
                                            <label className="text-slate-900 font-bold text-base">Monthly Bill</label>
                                            <span className="text-2xl sm:text-3xl font-black text-orange-500">₹{homeBill.toLocaleString()}</span>
                                        </div>
                                        <input
                                            type="range" min="1000" max="10000" step="100"
                                            value={homeBill}
                                            onChange={(e) => setHomeBill(+e.target.value)}
                                            className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-orange-500"
                                        />
                                        <div className="flex justify-between text-slate-400 text-xs mt-2 font-bold uppercase tracking-widest">
                                            <span>₹1k</span>
                                            <span>₹10k</span>
                                        </div>
                                    </div>

                                    <div className="bg-yellow-50 rounded-2xl p-5 border-2 border-yellow-100 flex items-center gap-4">
                                        <div className="bg-yellow-400 p-3 rounded-xl text-white shadow-lg shadow-yellow-200 flex-shrink-0">
                                            <ChevronRight size={24} strokeWidth={3} />
                                        </div>
                                        <div>
                                            <p className="text-yellow-800 font-black text-lg sm:text-xl">ROI in {homeMetrics.roi} Years</p>
                                            <p className="text-yellow-700/70 font-semibold text-sm">Estimated break-even period</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-28 h-28 bg-orange-500/10 rounded-full blur-3xl -mr-14 -mt-14" />
                                    <div className="space-y-4 relative z-10">
                                        <div className="flex justify-between items-center border-b border-white/10 pb-3">
                                            <span className="text-slate-400 font-medium text-sm">System Size</span>
                                            <span className="text-xl font-bold">{homeMetrics.kw} kW</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-400 font-medium text-sm">Total Project Cost</span>
                                            <span className="text-lg font-semibold">₹{homeMetrics.cost.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-emerald-400">
                                            <span className="font-medium text-sm">Govt. Subsidy</span>
                                            <span className="text-lg font-bold">- ₹{homeMetrics.subsidy.toLocaleString()}</span>
                                        </div>
                                        <div className="pt-3 border-t-2 border-white/20">
                                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Your Net Investment</p>
                                            <p className="text-3xl sm:text-4xl font-black text-orange-500">₹{homeMetrics.net.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-5">
                                    <div className="bg-slate-50 p-7 rounded-3xl text-center border border-slate-100">
                                        <div className="bg-white w-20 h-20 rounded-3xl shadow-xl shadow-slate-200 flex items-center justify-center mx-auto mb-5">
                                            {tab === "commercial" ? (
                                                <Building2 size={40} className="text-orange-500" />
                                            ) : (
                                                <Factory size={40} className="text-orange-500" />
                                            )}
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 capitalize">{tab} Solar</h3>
                                        <p className="text-slate-500 mt-2 font-medium leading-relaxed text-sm px-2">
                                            {tab === "commercial"
                                                ? "Perfect for Offices, Hospitals & Schools. Claim 40% Accelerated Depreciation."
                                                : "Heavy-duty infrastructure for Manufacturing units. Slash operational costs by up to 70%."}
                                        </p>
                                    </div>

                                    <div className="bg-red-50 border-2 border-dashed border-red-200 p-5 rounded-2xl text-center">
                                        <span className="bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">Pro Benefit</span>
                                        <p className="text-slate-900 font-extrabold text-base leading-tight">
                                            20 Professional Plant Deep-Cleaning Sessions <span className="text-red-600">— ABSOLUTELY FREE!</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="group relative border-2 border-slate-100 rounded-2xl focus-within:border-orange-400 transition-all p-1">
                                        <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500" size={18} />
                                        <input
                                            name="companyName" placeholder="Company Name"
                                            className="w-full pl-10 pr-4 py-3.5 bg-transparent outline-none font-bold text-slate-700 text-sm"
                                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                        />
                                    </div>

                                    <div className="group relative border-2 border-slate-100 rounded-2xl focus-within:border-orange-400 transition-all p-1">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500" size={18} />
                                        <input
                                            name="email" type="email" placeholder="Professional Email ID"
                                            className="w-full pl-10 pr-4 py-3.5 bg-transparent outline-none font-bold text-slate-700 text-sm"
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="group relative border-2 border-slate-100 rounded-2xl focus-within:border-orange-400 transition-all p-1">
                                            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500" size={15} />
                                            <input
                                                name="monthlyBill" type="number" placeholder="Avg. Bill"
                                                className="w-full pl-8 pr-3 py-3.5 bg-transparent outline-none font-bold text-slate-700 text-sm"
                                                onChange={(e) => setFormData({ ...formData, monthlyBill: e.target.value })}
                                            />
                                        </div>
                                        <div className="group relative border-2 border-slate-100 rounded-2xl focus-within:border-orange-400 transition-all p-1">
                                            <Map className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500" size={15} />
                                            <input
                                                name="roofArea" type="number" value={formData.roofArea}
                                                className="w-full pl-8 pr-3 py-3.5 bg-transparent outline-none font-bold text-slate-700 text-sm"
                                                onChange={(e) => setFormData({ ...formData, roofArea: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
                                        <div className="flex justify-between items-center">
                                            <span className="text-orange-800 font-bold uppercase text-[10px] tracking-widest">Potential Capacity</span>
                                            <span className="text-xl font-black text-orange-600">{capacity} kW</span>
                                        </div>
                                        <div className="w-full bg-orange-200 h-1.5 rounded-full mt-2 overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "60%" }}
                                                className="h-full bg-orange-500"
                                            />
                                        </div>
                                    </div>

                                    <button className="w-full bg-[#25D366] hover:bg-green-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-green-100 flex items-center justify-center gap-2.5 transition-all hover:-translate-y-0.5 active:scale-95 text-base">
                                        <MessageCircle size={20} fill="white" />
                                        Request Consultation
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
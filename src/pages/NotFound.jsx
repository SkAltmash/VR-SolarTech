import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Sun, Zap } from "lucide-react";
import SEO from "../componnets/SEO";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center px-6 py-20 font-sans relative overflow-hidden">
            <SEO
                title="404 — Page Not Found"
                description="The page you are looking for doesn't exist. Return to VR SolarTech's home page."
            />

            {/* Background decorative blobs */}
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-orange-100 rounded-full blur-[120px] opacity-60 pointer-events-none" />
            <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-amber-100 rounded-full blur-[100px] opacity-50 pointer-events-none" />

            <div className="relative z-10 text-center max-w-2xl mx-auto">

                {/* Animated Sun Illustration */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.7, ease: "backOut" }}
                    className="flex justify-center mb-8"
                >
                    <div className="relative">
                        {/* Outer glow ring */}
                        <motion.div
                            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 bg-orange-400 rounded-full blur-3xl"
                        />
                        {/* Sun icon container */}
                        <div className="relative w-36 h-36 bg-gradient-to-br from-orange-400 via-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl shadow-orange-300/60">
                            <Sun size={64} className="text-white" strokeWidth={1.5} />
                            {/* Orbit dot */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0"
                            >
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center shadow-lg">
                                    <Zap size={12} className="text-orange-400" fill="currentColor" />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* 404 Number */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <p className="text-[10rem] font-black text-slate-100 leading-none select-none tracking-tighter" style={{ lineHeight: 1 }}>
                        404
                    </p>
                </motion.div>

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="-mt-4"
                >
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
                        Page Not Found
                    </h1>
                    <p className="text-slate-500 text-lg font-medium max-w-md mx-auto leading-relaxed">
                        Looks like this page went off-grid! The solar panel you're looking for doesn't exist or has been moved.
                    </p>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
                >
                    <Link
                        to="/"
                        className="flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-orange-200 hover:-translate-y-1 transition-all duration-300 text-sm uppercase tracking-widest"
                    >
                        <Home size={18} />
                        Go Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-700 font-black px-8 py-4 rounded-2xl border border-slate-200 shadow-sm hover:-translate-y-1 transition-all duration-300 text-sm uppercase tracking-widest"
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </button>
                </motion.div>

                {/* Brand badge */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mt-16 text-xs font-black text-slate-300 uppercase tracking-[0.3em]"
                >
                    VR SolarTech · Powering Maharashtra
                </motion.p>
            </div>
        </div>
    );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calculator, Sparkles, Zap } from "lucide-react";
import SolarCalculator from "./ROI";

export default function ROIFloatingButton() {
    const [open, setOpen] = useState(false);

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [open]);

    return (
        <>
            {/* --- PRO FLOATING TRIGGER --- */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
                className="fixed bottom-8 left-6 z-[9998]"
            >
                {/* Pulsing Glow behind button */}
                <div className="absolute inset-0 bg-orange-500 rounded-2xl blur-xl opacity-40 animate-pulse" />

                <button
                    onClick={() => setOpen(true)}
                    className="group relative flex items-center gap-3 bg-slate-900 text-white font-black px-6 py-4 rounded-2xl shadow-2xl hover:bg-orange-600 hover:-translate-y-2 transition-all duration-300 active:scale-90"
                >
                    <div className="relative">
                        <Calculator size={20} className="group-hover:rotate-12 transition-transform" />
                        <span className="absolute -top-1 -right-1 flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </span>
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em]">ROI Calculator</span>
                </button>
            </motion.div>

            {/* --- MODAL OVERLAY --- */}
            <AnimatePresence>
                {open && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                            className="fixed inset-0 z-[9999] bg-slate-950/60 backdrop-blur-md cursor-zoom-out"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 100, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 100, scale: 0.95 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed inset-x-0 bottom-0 sm:inset-0 z-[10000] flex items-end sm:items-center justify-center p-0 sm:p-6 pointer-events-none"
                        >
                            <div className="relative w-full sm:max-w-4xl bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.3)] overflow-hidden max-h-[92vh] flex flex-col pointer-events-auto border border-slate-100">

                                {/* Mobile-only Drag Handle */}
                                <div className="sm:hidden w-12 h-1.5 bg-slate-200 rounded-full mx-auto mt-4 mb-2" />

                                {/* Header */}
                                <div className="flex items-center justify-between px-8 py-6 border-b border-slate-50 flex-shrink-0">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 shadow-inner">
                                            <Zap size={24} fill="currentColor" strokeWidth={0} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h2 className="font-black text-slate-900 text-xl tracking-tight">Solar Savings Hub</h2>
                                                <span className="hidden sm:flex items-center gap-1 bg-emerald-50 text-emerald-600 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter border border-emerald-100">
                                                    <Sparkles size={10} /> Live Logic
                                                </span>
                                            </div>
                                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-0.5">Instant ROI & Subsidy Breakdown</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setOpen(false)}
                                        className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all active:scale-90 group"
                                    >
                                        <X size={24} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-300" />
                                    </button>
                                </div>

                                {/* Main Calculator View */}
                                <div className="overflow-y-auto flex-1 scrollbar-hide bg-white p-2">
                                    <div className="max-w-3xl mx-auto py-4">
                                        <SolarCalculator />
                                    </div>
                                </div>

                                {/* Pro Modal Footer */}
                                <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest hidden sm:block">
                                        Verified by VR Solar Tech Engineering Team
                                    </p>
                                    <button
                                        onClick={() => setOpen(false)}
                                        className="w-full sm:w-auto px-8 py-3 bg-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-orange-600 transition-colors"
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Global CSS to hide internal calculator scrollbars if needed */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}} />
        </>
    );
}

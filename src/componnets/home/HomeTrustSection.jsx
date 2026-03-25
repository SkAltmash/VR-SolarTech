import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Zap, Leaf, Award, Star } from "lucide-react";

const trustItems = [
    { value: 500, suffix: "+", label: "Installations", icon: Award, color: "text-orange-400" },
    { value: 15, suffix: "MW+", label: "Capacity Installed", icon: Zap, color: "text-amber-400" },
    { value: 98, suffix: "%", label: "Customer Satisfaction", icon: Star, color: "text-yellow-400" },
    { value: 2, suffix: "Cr+", label: "Savings Delivered", icon: Leaf, color: "text-emerald-400" },
];

function Counter({ value, direction = "up" }) {
    const ref = useRef(null);
    const motionValue = useMotionValue(direction === "down" ? value : 0);
    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 100,
    });
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [motionValue, isInView, value]);

    useEffect(() => {
        springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Intl.NumberFormat("en-US").format(
                    latest.toFixed(0)
                );
            }
        });
    }, [springValue]);

    return <span ref={ref} />;
}

export default function HomeTrustSection() {
    return (
        <section className="relative py-20 bg-slate-950 overflow-hidden border-y border-white/5">
            {/* --- PRO BACKGROUND EFFECTS --- */}
            <div className="absolute inset-0 z-0 opacity-30">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-600/10 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">

                {/* Optional Header for Trust Section */}
                <div className="text-center mb-16">
                    <h2 className="text-slate-500 text-xs font-black uppercase tracking-[0.3em] mb-4">
                        Our Impact in Maharashtra
                    </h2>
                    <div className="h-1 w-12 bg-orange-500 mx-auto rounded-full" />
                </div>

                <div className="-mx-6 overflow-x-auto px-6 py-5 pb-2 sm:mx-0 sm:overflow-visible sm:px-0">
                    <div className="flex gap-6 min-w-max snap-x snap-mandatory sm:min-w-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 md:gap-10">
                        {trustItems.map(({ value, suffix, label, icon: Icon, color }, index) => (
                            <motion.div
                                key={label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="group relative w-[220px] shrink-0 snap-start sm:w-auto"
                            >
                                {/* Card Decoration */}
                                <div className="absolute -inset-2 bg-gradient-to-b from-orange-500/20 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />

                                <div className="relative bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-[2rem] p-8 text-center hover:border-white/20 transition-all duration-300">
                                    {/* Icon Circle */}
                                    <div className={`w-12 h-12 mx-auto rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ${color}`}>
                                        <Icon size={24} strokeWidth={2.5} />
                                    </div>

                                    {/* Value with Counter */}
                                    <div className={`text-3xl md:text-4xl font-black mb-2 tracking-tighter ${color} flex items-center justify-center`}>
                                        {label === "Savings Delivered" && <span className="mr-1">₹</span>}
                                        <Counter value={value} />
                                        <span>{suffix}</span>
                                    </div>

                                    {/* Label */}
                                    <p className="text-slate-400 text-xs md:text-sm font-black uppercase tracking-widest">
                                        {label}
                                    </p>

                                    {/* Bottom Accent */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-1 bg-white/10 rounded-full group-hover:bg-orange-500/50 group-hover:w-16 transition-all duration-500" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, PhoneCall, ArrowUpRight } from "lucide-react";

const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/projects", label: "Projects" },
    { to: "/contact", label: "Contact" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { pathname } = useLocation();

    // Scroll Detection
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close mobile menu on route change or resize
    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    useEffect(() => {
        const handleResize = () => window.innerWidth > 768 && setOpen(false);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled
                ? "py-3 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-xl shadow-slate-900/5"
                : "py-6 bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between">

                    {/* --- LOGO --- */}
                    <NavLink to="/" className="flex items-center gap-3 group relative z-[110]">
                        <div className="relative">
                            <div className="w-13 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:rotate-12 transition-transform duration-500">
                                <img src="/logo.png" className="w-full h-full" alt="logo" />
                            </div>
                            <div className="absolute inset-0 bg-orange-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity" />
                        </div>

                    </NavLink>

                    {/* --- DESKTOP NAV --- */}
                    <div className="hidden md:flex items-center bg-slate-100/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/10">
                        {links.map(({ to, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={to === "/"}
                                className={({ isActive }) =>
                                    `relative px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 ${scrolled
                                        ? isActive
                                            ? "text-orange-600 bg-white shadow-sm"
                                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
                                        : isActive
                                            ? "text-orange-700 bg-white shadow-sm"
                                            : "text-orange-400 hover:text-orange-300 hover:bg-white/10"
                                    }`
                                }
                            >
                                {label}
                            </NavLink>
                        ))}
                    </div>

                    {/* --- DESKTOP CTA --- */}
                    <div className="hidden md:flex items-center gap-4">
                        <a
                            href="tel:+919545966868"
                            className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-orange-600 hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-slate-900/10 active:scale-95"
                        >
                            <PhoneCall size={14} className="text-orange-400" />
                            Call Support
                        </a>
                    </div>

                    {/* --- MOBILE TOGGLE --- */}
                    <button
                        onClick={() => setOpen(!open)}
                        className={`md:hidden relative z-[110] p-3 rounded-2xl transition-all ${open
                            ? "bg-slate-900 text-white"
                            : scrolled
                                ? "bg-orange-50 text-orange-600"
                                : "bg-white/10 text-orange-500 backdrop-blur-md"
                            }`}
                    >
                        {open ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
                    </button>
                </div>
            </div>

            {/* --- MOBILE OVERLAY MENU --- */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-[100] bg-white pt-32 px-6 pb-10 flex flex-col h-screen overflow-hidden"
                    >
                        {/* Decorative background element for mobile menu */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-[100px] -mr-20 -mt-20 opacity-50" />

                        <div className="space-y-2 relative z-10">
                            {links.map(({ to, label }, index) => (
                                <motion.div
                                    key={to}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <NavLink
                                        to={to}
                                        end={to === "/"}
                                        className={({ isActive }) =>
                                            `flex items-center justify-between px-6 py-5 rounded-[2rem] font-black text-2xl tracking-tighter transition-all ${isActive
                                                ? "bg-orange-500 text-white shadow-2xl shadow-orange-200"
                                                : "text-slate-900 hover:bg-slate-50"
                                            }`
                                        }
                                    >
                                        {label}
                                        <ArrowUpRight size={24} className="opacity-30" />
                                    </NavLink>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-auto relative z-10">
                            <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">
                                Connect with Experts
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <a
                                    href="tel:+919545966868"
                                    className="flex flex-col items-center gap-2 p-6 bg-slate-900 rounded-[2rem] text-white transition-transform active:scale-95"
                                >
                                    <PhoneCall size={24} className="text-orange-500" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Call Now</span>
                                </a>
                                <NavLink
                                    to="/contact"
                                    className="flex flex-col items-center gap-2 p-6 bg-orange-500 rounded-[2rem] text-white transition-transform active:scale-95 shadow-xl shadow-orange-200"
                                >
                                    <Sun size={24} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Inquiry</span>
                                </NavLink>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

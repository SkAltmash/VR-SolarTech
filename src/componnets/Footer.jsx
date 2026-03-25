import {
    Phone, Mail, MapPin, ArrowUpRight, ShieldCheck, Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import { InstagramIcon, FacebookIcon, YouTubeIcon } from "./SocialIcons";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: InstagramIcon, href: "https://www.instagram.com/vrsolartech?igsh=ZTExcnFnNmRmcDl6", label: "Instagram" },
        { icon: FacebookIcon, href: "https://www.facebook.com/share/1N8DkaJn99/", label: "Facebook" },
        { icon: YouTubeIcon, href: "https://youtube.com/@vrsolartech?si=e09ybd1KulboMa8Q", label: "YouTube" },
    ];

    const quickLinks = [
        { label: "Home", to: "/" },
        { label: "About", to: "/about" },
        { label: "Services", to: "/services" },
        { label: "Projects", to: "/projects" },
        { label: "Contact", to: "/contact" },
    ];

    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 font-sans pb-20">
            <div className="max-w-7xl mx-auto px-6">

                <div className="grid lg:grid-cols-12 gap-12 mb-16">

                    {/* --- BRAND SECTION --- */}
                    <div className="lg:col-span-4 space-y-6">
                        <img src="/logo.png" alt="VR Solar Tech Logo" className="h-16 w-auto object-contain" />
                        <p className="text-slate-400 leading-relaxed font-medium">
                            Leading the transition to sustainable energy with high-efficiency solar solutions for residential, commercial, and industrial sectors.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300"
                                >
                                    <social.icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* --- QUICK LINKS --- */}
                    <div className="lg:col-span-2 space-y-6">
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs">Quick Links</h4>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
                            {quickLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className="text-sm font-semibold text-slate-400 hover:text-orange-400 transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* --- CONTACT INFO --- */}
                    <div className="lg:col-span-2 space-y-6">
                        <Link to={'/admin'}>
                            <h4 className="text-white font-bold uppercase tracking-widest text-xs pb-5">Quick Contact</h4></Link>
                        <div className="space-y-4">
                            <a href="tel:+919545966868" className="flex items-center gap-3 hover:text-orange-400 transition-colors group">
                                <Phone size={18} className="text-orange-500" />
                                <span className="font-semibold">+91 95459 66868</span>
                            </a>
                            <a href="tel:+917977876208" className="flex items-center gap-3 hover:text-orange-400 transition-colors group">
                                <Phone size={18} className="text-orange-500" />
                                <span className="font-semibold">+91 79778 76208</span>
                            </a>
                            <a href="mailto:vrsolartech18@gmail.com" className="flex items-center gap-3 hover:text-orange-400 transition-colors group">
                                <Mail size={18} className="text-orange-500" />
                                <span className="font-semibold">vrsolartech18@gmail.com</span>
                            </a>
                        </div>

                        <div className="pt-4 space-y-3">
                            <div className="flex gap-3 items-start">
                                <MapPin size={18} className="text-orange-500 flex-shrink-0 mt-1" />
                                <p className="text-sm text-slate-400 leading-snug">
                                    Airoli, Sector-03, F-78, Navi Mumbai, MH - 400 708
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* --- MAP SECTION --- */}
                    <div className="lg:col-span-4">
                        <div className="rounded-3xl overflow-hidden border-4 border-slate-800 shadow-2xl h-64 relative group">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.2149169586755!2d73.3636901!3d18.9661136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7fbef381bf997%3A0xc28a23feb4757986!2sVR%20Solartech!5e0!3m2!1sen!2sin!4v1774362780323!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                            <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md p-2 rounded-lg text-[10px] font-bold text-white uppercase tracking-tighter pointer-events-none border border-white/10">
                                Find Us on Maps
                            </div>
                        </div>
                    </div>

                </div>

                {/* --- DIVIDER --- */}
                <div className="h-px bg-slate-800 w-full mb-8" />

                {/* --- BOTTOM BAR --- */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-sm font-medium text-slate-500">
                        © {currentYear} VR Solar Tech. All Rights Reserved.
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-600">
                            <ShieldCheck size={14} className="text-emerald-500" /> Govt. Approved Vendor
                        </div>
                        <div className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-600">
                            <Zap size={14} className="text-orange-500" /> 100% Clean Energy
                        </div>
                    </div>

                    {/* YOUR CREDIT LINE */}
                    <div className="group">
                        <a
                            href="https://iamsk.netlify.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-all"
                        >
                            <span className="text-slate-600 font-medium italic">Architected by</span>
                            <span className="bg-slate-800 px-3 py-1 rounded-full group-hover:bg-orange-500 transition-colors">
                                SK ALTAMASH
                            </span>
                            <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
}

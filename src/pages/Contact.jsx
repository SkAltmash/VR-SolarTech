import { useState } from "react";
import {
    Phone, Mail, MapPin, MessageCircle, Building2,
    CheckCircle, ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { InstagramIcon, FacebookIcon, YouTubeIcon } from "../componnets/SocialIcons";

const contactPoints = [
    {
        icon: Phone,
        label: "Primary Contact",
        value: "+91 95459 66868",
        href: "tel:+919545966868"
    },
    {
        icon: Phone,
        label: "Support Line",
        value: "+91 79778 76208",
        href: "tel:+917977876208"
    },
    {
        icon: Mail,
        label: "Email Us",
        value: "vrsolartech18@gmail.com",
        href: "mailto:vrsolartech18@gmail.com"
    },
];

const socials = [
    {
        icon: InstagramIcon,
        href: "https://www.instagram.com/vrsolartech?igsh=ZTExcnFnNmRmcDl6",
        color: "hover:bg-pink-500",
        label: "Instagram"
    },
    {
        icon: FacebookIcon,
        href: "https://www.facebook.com/share/1N8DkaJn99/",
        color: "hover:bg-blue-600",
        label: "Facebook"
    },
    {
        icon: YouTubeIcon,
        href: "https://youtube.com/@vrsolartech?si=e09ybd1KulboMa8Q",
        color: "hover:bg-red-600",
        label: "YouTube"
    },
];

const offices = [
    {
        icon: Building2,
        label: "Head Office",
        value: "Kadav-Chandhai road, Chandhai, Tal-Karjat, Dist:- Raigad, Pin 410 201",
    },
    {
        icon: MapPin,
        label: "Branch Office",
        value: "Airoli, Sector-03, F-78, Navi Mumbai, Dist- Thane, Pin- 400 708",
    },
];

export default function Contact() {
    const [form, setForm] = useState({ name: "", phone: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name.trim() || !form.phone.trim()) return;
        setLoading(true);
        try {
            await addDoc(collection(db, "contacts"), {
                ...form,
                createdAt: serverTimestamp(),
            });
            setSubmitted(true);
            setForm({ name: "", phone: "", message: "" });
        } catch (err) {
            alert("Failed to send. Please try again.");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] pt-28 pb-20 font-sans">
            <div className="max-w-6xl mx-auto px-5">

                {/* --- HEADER --- */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-[0.2em] mb-6 border border-orange-100">
                        <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                        Available for Consultation
                    </div>
                    <h1 className="text-5xl sm:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                        Let's Power <span className="text-orange-500 underline decoration-orange-200 decoration-8 underline-offset-8">Together</span>
                    </h1>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
                        Have questions about solar installation or government subsidies?
                        Reach out to the VR Solar Tech team.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-10 items-start">

                    {/* --- LEFT COLUMN: INFO & SOCIALS --- */}
                    <div className="lg:col-span-5 space-y-6">

                        {/* Contact Cards Grid */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
                            {contactPoints.map(({ icon: Icon, label, value, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    className="flex items-center gap-5 bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all group"
                                >
                                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                                        <Icon size={20} className="text-orange-500 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
                                        <p className="text-slate-900 font-bold text-sm sm:text-base">{value}</p>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Social Connect Section */}
                        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h4 className="text-xl font-black mb-2">Follow Our Journey</h4>
                                <p className="text-slate-400 text-sm mb-6">See our latest installations and solar tips.</p>
                                <div className="flex gap-4">
                                    {socials.map((social) => (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center transition-all duration-300 ${social.color} group`}
                                        >
                                            <social.icon size={24} className="group-hover:scale-110 transition-transform" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                            {/* Decorative element */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>
                        </div>

                        {/* WhatsApp Bridge */}
                        <a
                            href="https://wa.me/919545966868"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 bg-[#25D366] text-white font-black py-5 rounded-[2rem] shadow-2xl shadow-green-200/50 hover:bg-green-600 transition-all text-lg group"
                        >
                            <MessageCircle size={24} fill="currentColor" />
                            Direct WhatsApp Chat
                            <ExternalLink size={16} className="opacity-50 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    {/* --- RIGHT COLUMN: FORM & OFFICES --- */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* Main Contact Form */}
                        <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/40">
                            <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                                Send us a Message
                                <span className="h-1 w-12 bg-orange-500 rounded-full" />
                            </h3>

                            {submitted ? (
                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle size={40} className="text-emerald-500" />
                                    </div>
                                    <h4 className="font-black text-slate-900 text-2xl mb-2">Message Received!</h4>
                                    <p className="text-slate-500 font-medium mb-8">An expert from VR Solar Tech will call you shortly.</p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="bg-slate-100 text-slate-600 font-bold px-8 py-3 rounded-xl hover:bg-slate-200 transition-colors"
                                    >
                                        Send Another
                                    </button>
                                </motion.div>
                            ) : (
                                <form className="space-y-5" onSubmit={handleSubmit}>
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                            <input
                                                type="text"
                                                placeholder="John Doe"
                                                value={form.name}
                                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-6 py-4 text-slate-900 font-bold placeholder-slate-300 outline-none focus:bg-white focus:border-orange-400 transition-all"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                                            <input
                                                type="tel"
                                                placeholder="+91 00000 00000"
                                                value={form.phone}
                                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                                className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-6 py-4 text-slate-900 font-bold placeholder-slate-300 outline-none focus:bg-white focus:border-orange-400 transition-all"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Requirement Details</label>
                                        <textarea
                                            placeholder="I'm interested in a 5kW On-Grid Solar System..."
                                            rows={4}
                                            value={form.message}
                                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                                            className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-6 py-4 text-slate-900 font-bold placeholder-slate-300 outline-none focus:bg-white focus:border-orange-400 transition-all resize-none"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-orange-200 transition-all active:scale-[0.98] disabled:opacity-50 text-lg"
                                    >
                                        {loading ? "Processing..." : "Submit Inquiry"}
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Office Addresses Grid */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            {offices.map(({ icon: Icon, label, value }) => (
                                <div
                                    key={label}
                                    className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                                            <Icon size={18} className="text-orange-500" />
                                        </div>
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{label}</p>
                                    </div>
                                    <p className="text-slate-700 font-semibold text-sm leading-relaxed">{value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

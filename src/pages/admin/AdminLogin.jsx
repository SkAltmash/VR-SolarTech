import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Sun, Lock, Mail } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Login successful");
            navigate("/admin");
        } catch {
            setError("Invalid email or password");
            toast.error("Invalid email or password");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-orange-500/30">
                        <Sun size={28} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-black text-white">Admin Panel</h1>
                    <p className="text-slate-400 text-sm mt-1">VR SolarTech Dashboard</p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="bg-white/5 border border-white/10 backdrop-blur rounded-3xl p-7 space-y-5">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-semibold px-4 py-3 rounded-xl text-center">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Email</label>
                        <div className="relative">
                            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@example.com"
                                className="w-full bg-white/5 border-2 border-white/10 rounded-xl pl-11 pr-4 py-3 text-white font-semibold placeholder-slate-600 outline-none focus:border-orange-500 transition-colors text-sm"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Password</label>
                        <div className="relative">
                            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-white/5 border-2 border-white/10 rounded-xl pl-11 pr-4 py-3 text-white font-semibold placeholder-slate-600 outline-none focus:border-orange-500 transition-colors text-sm"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black py-3.5 rounded-xl shadow-lg shadow-orange-500/25 hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-50"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
}

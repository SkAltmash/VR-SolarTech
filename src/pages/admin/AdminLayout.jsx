import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Sun, Settings, FolderKanban, MessageSquare, Calculator, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const navItems = [
    { to: "/admin", label: "Services", icon: Settings, end: true },
    { to: "/admin/projects", label: "Projects", icon: FolderKanban },
    { to: "/admin/messages", label: "Messages", icon: MessageSquare },
    { to: "/admin/roi", label: "ROI Data", icon: Calculator },
];

export default function AdminLayout() {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = async () => {
        await signOut(auth);
        toast.success("Signed out");
        navigate("/admin/login");
    };

    const SidebarContent = () => (
        <>
            {/* Logo */}
            <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-700">
                <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Sun size={18} className="text-white" />
                </div>
                <div>
                    <p className="font-black text-white text-sm leading-none">VR SolarTech</p>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">Admin</p>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 space-y-1">
                {navItems.map(({ to, label, icon: Icon, end }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={end}
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${isActive
                                ? "bg-orange-500/10 text-orange-400"
                                : "text-slate-400 hover:text-white hover:bg-white/5"
                            }`
                        }
                    >
                        <Icon size={18} />
                        {label}
                    </NavLink>
                ))}
            </nav>

            {/* Logout */}
            <div className="px-3 pb-4">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-semibold text-sm text-red-400 hover:bg-red-500/10 transition-all"
                >
                    <LogOut size={18} />
                    Sign Out
                </button>
            </div>
        </>
    );

    return (
        <div className="min-h-screen bg-slate-100 flex">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-60 bg-slate-900 fixed top-0 left-0 bottom-0 z-40">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
                    <aside className="relative flex flex-col w-64 bg-slate-900 h-full">
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                        <SidebarContent />
                    </aside>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 md:ml-60">
                {/* Mobile top bar */}
                <div className="md:hidden flex items-center justify-between bg-white px-4 py-3 border-b border-slate-200 sticky top-0 z-30">
                    <button onClick={() => setSidebarOpen(true)} className="text-slate-700">
                        <Menu size={22} />
                    </button>
                    <span className="font-black text-slate-900 text-sm">Admin Panel</span>
                    <div className="w-6" />
                </div>

                <div className="p-4 sm:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

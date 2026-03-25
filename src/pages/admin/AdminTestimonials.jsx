import { useState, useEffect } from "react";
import {
    collection, addDoc, deleteDoc, doc, onSnapshot,
    query, orderBy, serverTimestamp, updateDoc
} from "firebase/firestore";
import { db } from "../../firebase";
import { Star, Trash2, Pencil, Plus, X, Loader2, Quote, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const emptyForm = { name: "", location: "", text: "", rating: 5, source: "Justdial" };

export default function AdminTestimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState(emptyForm);
    const [editId, setEditId] = useState(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
        const unsub = onSnapshot(q, (snap) => {
            setTestimonials(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
            setLoading(false);
        }, () => {
            toast.error("Failed to load testimonials");
            setLoading(false);
        });
        return unsub;
    }, []);

    const openAdd = () => {
        setForm(emptyForm);
        setEditId(null);
        setShowModal(true);
    };

    const openEdit = (t) => {
        setForm({ name: t.name, location: t.location, text: t.text, rating: t.rating, source: t.source || "Justdial" });
        setEditId(t.id);
        setShowModal(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!form.name.trim() || !form.text.trim()) return;
        setSaving(true);
        try {
            if (editId) {
                await updateDoc(doc(db, "testimonials", editId), { ...form });
                toast.success("Testimonial updated!");
            } else {
                await addDoc(collection(db, "testimonials"), {
                    ...form,
                    createdAt: serverTimestamp(),
                });
                toast.success("Testimonial added!");
            }
            setShowModal(false);
        } catch {
            toast.error("Failed to save testimonial");
        }
        setSaving(false);
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this testimonial?")) return;
        try {
            await deleteDoc(doc(db, "testimonials", id));
            toast.success("Deleted");
        } catch {
            toast.error("Failed to delete");
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-black text-slate-900">Testimonials</h1>
                    <p className="text-slate-500 text-sm font-medium mt-1">{testimonials.length} review{testimonials.length !== 1 ? "s" : ""} total</p>
                </div>
                <button
                    onClick={openAdd}
                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-black px-5 py-3 rounded-xl shadow-lg shadow-orange-200 transition-all active:scale-95 text-sm"
                >
                    <Plus size={16} />
                    Add Testimonial
                </button>
            </div>

            {/* List */}
            {loading ? (
                <div className="flex items-center justify-center py-20 text-slate-400">
                    <Loader2 size={20} className="animate-spin mr-2" /> Loading...
                </div>
            ) : testimonials.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
                    <Quote size={40} className="mx-auto mb-3 text-slate-200" />
                    <p className="font-black text-slate-500 text-lg">No testimonials yet</p>
                    <p className="text-slate-400 text-sm mt-1">Add your first customer review</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {testimonials.map((t) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex gap-5 items-start"
                        >
                            {/* Avatar */}
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center font-black text-orange-500 text-lg flex-shrink-0">
                                {t.name?.charAt(0) || "?"}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-3 mb-1">
                                    <p className="font-black text-slate-900">{t.name}</p>
                                    <span className="text-xs text-slate-400 font-semibold">{t.location}</span>
                                    {t.source && (
                                        <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 text-[10px] font-black px-2 py-0.5 rounded-full border border-blue-100">
                                            <CheckCircle2 size={10} fill="currentColor" className="text-white" />
                                            {t.source}
                                        </span>
                                    )}
                                </div>
                                <div className="flex gap-0.5 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={13}
                                            className={i < t.rating ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"} />
                                    ))}
                                </div>
                                <p className="text-slate-600 text-sm font-medium leading-relaxed italic">"{t.text}"</p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 flex-shrink-0">
                                <button
                                    onClick={() => openEdit(t)}
                                    className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    <Pencil size={15} />
                                </button>
                                <button
                                    onClick={() => handleDelete(t.id)}
                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 size={15} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4"
                        onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 10 }}
                            className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-black text-slate-900">
                                    {editId ? "Edit Testimonial" : "Add Testimonial"}
                                </h2>
                                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                                    <X size={18} className="text-slate-500" />
                                </button>
                            </div>

                            <form onSubmit={handleSave} className="space-y-5">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer Name *</label>
                                        <input
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            placeholder="Rohit Patil"
                                            required
                                            className="w-full bg-slate-50 border-2 border-transparent rounded-xl px-4 py-3 font-semibold text-slate-900 placeholder-slate-300 outline-none focus:bg-white focus:border-orange-400 transition-all text-sm"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</label>
                                        <input
                                            value={form.location}
                                            onChange={(e) => setForm({ ...form, location: e.target.value })}
                                            placeholder="Navi Mumbai"
                                            className="w-full bg-slate-50 border-2 border-transparent rounded-xl px-4 py-3 font-semibold text-slate-900 placeholder-slate-300 outline-none focus:bg-white focus:border-orange-400 transition-all text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Review Text *</label>
                                    <textarea
                                        value={form.text}
                                        onChange={(e) => setForm({ ...form, text: e.target.value })}
                                        placeholder="The team was very professional..."
                                        required
                                        rows={4}
                                        className="w-full bg-slate-50 border-2 border-transparent rounded-xl px-4 py-3 font-semibold text-slate-900 placeholder-slate-300 outline-none focus:bg-white focus:border-orange-400 transition-all text-sm resize-none"
                                    />
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rating</label>
                                        <div className="flex gap-2 items-center py-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setForm({ ...form, rating: star })}
                                                    className="transition-transform hover:scale-110"
                                                >
                                                    <Star size={24}
                                                        className={star <= form.rating ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Source</label>
                                        <select
                                            value={form.source}
                                            onChange={(e) => setForm({ ...form, source: e.target.value })}
                                            className="w-full bg-slate-50 border-2 border-transparent rounded-xl px-4 py-3 font-semibold text-slate-900 outline-none focus:bg-white focus:border-orange-400 transition-all text-sm"
                                        >
                                            <option>Justdial</option>
                                            <option>Google</option>
                                            <option>Facebook</option>
                                            <option>Direct</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-xl shadow-lg shadow-orange-200 transition-all active:scale-[0.98] disabled:opacity-60"
                                >
                                    {saving ? "Saving..." : editId ? "Update Testimonial" : "Add Testimonial"}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

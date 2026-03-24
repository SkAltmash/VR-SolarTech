import { useState, useEffect } from "react";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { Plus, Pencil, Trash2, X, Save, Image as ImageIcon, Loader2, GripVertical } from "lucide-react";
import toast from "react-hot-toast";

// Cloudinary config
const CLOUD_NAME = "dhjwborcq";
const UPLOAD_PRESET = "Upload";

const GRADIENTS = [
    "from-orange-400 to-amber-400",
    "from-blue-400 to-indigo-500",
    "from-purple-400 to-pink-500",
    "from-emerald-400 to-teal-500",
    "from-yellow-400 to-orange-400",
    "from-rose-400 to-pink-500",
];

const BADGE_COLORS = [
    { label: "Orange", value: "bg-orange-100 text-orange-600" },
    { label: "Blue", value: "bg-blue-100 text-blue-600" },
    { label: "Purple", value: "bg-purple-100 text-purple-600" },
    { label: "Green", value: "bg-emerald-100 text-emerald-600" },
    { label: "Yellow", value: "bg-yellow-100 text-yellow-700" },
];

const empty = { title: "", desc: "", badge: "", badgeColor: BADGE_COLORS[0].value, gradient: GRADIENTS[0], image: "" };

const sortByPosition = (items) =>
    [...items].sort((a, b) => {
        const aPos = Number.isFinite(Number(a.position)) ? Number(a.position) : 9999;
        const bPos = Number.isFinite(Number(b.position)) ? Number(b.position) : 9999;
        if (aPos !== bPos) return aPos - bPos;
        return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
    });

export default function AdminServices() {
    const [services, setServices] = useState([]);
    const [form, setForm] = useState(empty);
    const [editId, setEditId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [draggingId, setDraggingId] = useState(null);
    const [ordering, setOrdering] = useState(false);

    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, "services"),
            (snap) => {
                setServices(sortByPosition(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));
                setLoading(false);
            },
            () => {
                toast.error("Failed to load services");
                setLoading(false);
            }
        );
        return unsub;
    }, []);

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", UPLOAD_PRESET);

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: data,
            });
            const json = await res.json();
            if (json.secure_url) {
                setForm(prev => ({ ...prev, image: json.secure_url }));
                toast.success("Image uploaded");
            }
        } catch {
            toast.error("Image upload failed");
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        if (!form.title.trim()) {
            toast.error("Title is required");
            return;
        }
        setSaving(true);
        const existing = services.find((s) => s.id === editId);
        const payload = {
            ...form,
            position: editId
                ? (Number.isFinite(Number(existing?.position)) ? Number(existing.position) : services.length)
                : services.length,
        };
        try {
            if (editId) {
                await updateDoc(doc(db, "services", editId), { ...payload, updatedAt: serverTimestamp() });
                toast.success("Service updated");
            } else {
                await addDoc(collection(db, "services"), { ...payload, createdAt: serverTimestamp() });
                toast.success("Service added");
            }
            setForm(empty);
            setEditId(null);
            setShowForm(false);
        } catch {
            toast.error("Failed to save service");
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (s) => {
        setForm({
            title: s.title,
            desc: s.desc,
            badge: s.badge || "",
            badgeColor: s.badgeColor || BADGE_COLORS[0].value,
            gradient: s.gradient || GRADIENTS[0],
            image: s.image || "",
        });
        setEditId(s.id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (confirm("Delete this service?")) {
            try {
                await deleteDoc(doc(db, "services", id));
                toast.success("Service deleted");
            } catch {
                toast.error("Failed to delete service");
            }
        }
    };

    const moveItem = (list, fromIndex, toIndex) => {
        const next = [...list];
        const [moved] = next.splice(fromIndex, 1);
        next.splice(toIndex, 0, moved);
        return next;
    };

    const persistOrder = async (orderedServices) => {
        setOrdering(true);
        const withPositions = orderedServices.map((item, index) => ({ ...item, position: index }));
        setServices(withPositions);
        try {
            await Promise.all(
                withPositions.map((item, index) =>
                    updateDoc(doc(db, "services", item.id), { position: index, updatedAt: serverTimestamp() })
                )
            );
            toast.success("Service order updated");
        } catch {
            toast.error("Failed to save service order");
        } finally {
            setOrdering(false);
        }
    };

    const handleDragStart = (id) => setDraggingId(id);

    const handleDragOver = (e, targetId) => {
        e.preventDefault();
        if (!draggingId || draggingId === targetId) return;
        setServices((prev) => {
            const fromIndex = prev.findIndex((item) => item.id === draggingId);
            const toIndex = prev.findIndex((item) => item.id === targetId);
            if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return prev;
            return moveItem(prev, fromIndex, toIndex);
        });
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        if (!draggingId) return;
        const ordered = [...services];
        setDraggingId(null);
        await persistOrder(ordered);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-black text-slate-900">Services</h1>
                <button
                    onClick={() => { setForm(empty); setEditId(null); setShowForm(true); }}
                    className="flex items-center gap-2 bg-orange-500 text-white font-bold px-4 py-2.5 rounded-xl text-sm hover:-translate-y-0.5 active:scale-95 transition-all shadow-md shadow-orange-200"
                >
                    <Plus size={16} /> Add Service
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" style={{ background: "rgba(0,0,0,0.5)" }}>
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4 my-8">
                        <div className="flex items-center justify-between">
                            <h2 className="font-black text-lg text-slate-900">{editId ? "Edit" : "Add"} Service</h2>
                            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-700"><X size={20} /></button>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Service Image</label>
                            <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:bg-slate-50 transition-colors">
                                {form.image ? (
                                    <div className="relative group rounded-lg overflow-hidden">
                                        <img src={form.image} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="text-white text-xs font-bold">Change Image</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="py-4">
                                        {uploading ? <Loader2 className="animate-spin mx-auto text-orange-500 mb-2" size={24} /> : <ImageIcon className="mx-auto text-slate-400 mb-2" size={24} />}
                                        <span className="text-sm font-semibold text-slate-500">{uploading ? "Uploading..." : "Click to upload image"}</span>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={uploading}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-orange-400" />
                        <textarea placeholder="Description" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} rows={3}
                            className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-orange-400 resize-none" />
                        <input placeholder="Badge text (e.g. Most Popular)" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })}
                            className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-orange-400" />

                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Badge Color</label>
                            <div className="flex flex-wrap gap-2">
                                {BADGE_COLORS.map((bc) => (
                                    <button key={bc.value} onClick={() => setForm({ ...form, badgeColor: bc.value })}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${bc.value} ${form.badgeColor === bc.value ? "ring-2 ring-orange-400 ring-offset-1" : ""}`}>
                                        {bc.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Fallback Gradient</label>
                            <p className="text-[10px] text-slate-400 mb-2">Used if no image is uploaded</p>
                            <div className="flex flex-wrap gap-2">
                                {GRADIENTS.map((g) => (
                                    <button key={g} onClick={() => setForm({ ...form, gradient: g })}
                                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${g} ${form.gradient === g ? "ring-2 ring-orange-400 ring-offset-2" : ""}`} />
                                ))}
                            </div>
                        </div>

                        <button onClick={handleSave} disabled={uploading || saving}
                            className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white font-black py-3 rounded-xl hover:-translate-y-0.5 active:scale-95 transition-all shadow-md disabled:opacity-50">
                            <Save size={16} /> {saving ? "Saving..." : `${editId ? "Update" : "Add"} Service`}
                        </button>
                    </div>
                </div>
            )}

            {/* List */}
            {loading ? (
                <div className="flex items-center justify-center py-16 text-slate-500">
                    <Loader2 className="animate-spin mr-2" size={18} />
                    Loading services...
                </div>
            ) : services.length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                    <p className="text-lg font-bold">No services yet</p>
                    <p className="text-sm">Click "Add Service" to create one</p>
                </div>
            ) : (
                <div className="space-y-3">
                    <p className="text-xs font-semibold text-slate-500">
                        Drag and drop cards to adjust display order.
                        {ordering && <span className="inline-flex items-center ml-2"><Loader2 className="animate-spin mr-1" size={12} />Saving order...</span>}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                    {services.map((s) => (
                        <div
                            key={s.id}
                            draggable
                            onDragStart={() => handleDragStart(s.id)}
                            onDragOver={(e) => handleDragOver(e, s.id)}
                            onDrop={handleDrop}
                            onDragEnd={() => setDraggingId(null)}
                            className={`bg-white rounded-2xl p-5 border shadow-sm flex items-start gap-4 cursor-grab active:cursor-grabbing ${draggingId === s.id ? "border-orange-300 opacity-70" : "border-slate-100"}`}
                        >
                            {/* Thumbnail */}
                            <div className={`w-16 h-16 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden flex-shrink-0 ${!s.image ? `bg-gradient-to-br ${s.gradient || GRADIENTS[0]}` : "bg-slate-100"}`}>
                                {s.image ? (
                                    <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-white text-lg font-black">{s.title?.[0]}</span>
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                        <GripVertical size={14} className="text-slate-300" />
                                        <h3 className="font-bold text-slate-900 text-sm">{s.title}</h3>
                                    </div>
                                    <div className="flex gap-1">
                                        <button onClick={() => handleEdit(s)} className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                                            <Pencil size={14} />
                                        </button>
                                        <button onClick={() => handleDelete(s.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                                {s.badge && <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${s.badgeColor || BADGE_COLORS[0].value} inline-block mb-1.5`}>{s.badge}</span>}
                                <p className="text-slate-500 text-xs line-clamp-2">{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
                </div>
            )}
        </div>
    );
}

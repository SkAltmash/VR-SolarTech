import { useState, useEffect } from "react";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { Plus, Pencil, Trash2, X, Save, Image as ImageIcon, Loader2, GripVertical } from "lucide-react";
import toast from "react-hot-toast";

// Cloudinary config
const CLOUD_NAME = "dhjwborcq";
const UPLOAD_PRESET = "Upload";

const COLORS = [
    "from-orange-400 to-amber-400",
    "from-blue-400 to-indigo-500",
    "from-purple-400 to-pink-500",
    "from-emerald-400 to-teal-500",
    "from-rose-400 to-pink-500",
    "from-yellow-400 to-orange-400",
];

const empty = { title: "", location: "", capacity: "", type: "", saved: "", color: COLORS[0], image: "" };

const sortByPosition = (items) =>
    [...items].sort((a, b) => {
        const aPos = Number.isFinite(Number(a.position)) ? Number(a.position) : 9999;
        const bPos = Number.isFinite(Number(b.position)) ? Number(b.position) : 9999;
        if (aPos !== bPos) return aPos - bPos;
        return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
    });

export default function AdminProjects() {
    const [projects, setProjects] = useState([]);
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
            collection(db, "projects"),
            (snap) => {
                setProjects(sortByPosition(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));
                setLoading(false);
            },
            () => {
                toast.error("Failed to load projects");
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
            toast.error("Project title is required");
            return;
        }
        setSaving(true);
        const existing = projects.find((p) => p.id === editId);
        const payload = {
            ...form,
            position: editId
                ? (Number.isFinite(Number(existing?.position)) ? Number(existing.position) : projects.length)
                : projects.length,
        };
        try {
            if (editId) {
                await updateDoc(doc(db, "projects", editId), { ...payload, updatedAt: serverTimestamp() });
                toast.success("Project updated");
            } else {
                await addDoc(collection(db, "projects"), { ...payload, createdAt: serverTimestamp() });
                toast.success("Project added");
            }
            setForm(empty);
            setEditId(null);
            setShowForm(false);
        } catch {
            toast.error("Failed to save project");
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (p) => {
        setForm({
            title: p.title,
            location: p.location,
            capacity: p.capacity,
            type: p.type,
            saved: p.saved,
            color: p.color || COLORS[0],
            image: p.image || "",
        });
        setEditId(p.id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (confirm("Delete this project?")) {
            try {
                await deleteDoc(doc(db, "projects", id));
                toast.success("Project deleted");
            } catch {
                toast.error("Failed to delete project");
            }
        }
    };

    const moveItem = (list, fromIndex, toIndex) => {
        const next = [...list];
        const [moved] = next.splice(fromIndex, 1);
        next.splice(toIndex, 0, moved);
        return next;
    };

    const persistOrder = async (orderedProjects) => {
        setOrdering(true);
        const withPositions = orderedProjects.map((item, index) => ({ ...item, position: index }));
        setProjects(withPositions);
        try {
            await Promise.all(
                withPositions.map((item, index) =>
                    updateDoc(doc(db, "projects", item.id), { position: index, updatedAt: serverTimestamp() })
                )
            );
            toast.success("Project order updated");
        } catch {
            toast.error("Failed to save project order");
        } finally {
            setOrdering(false);
        }
    };

    const handleDragStart = (id) => setDraggingId(id);

    const handleDragOver = (e, targetId) => {
        e.preventDefault();
        if (!draggingId || draggingId === targetId) return;
        setProjects((prev) => {
            const fromIndex = prev.findIndex((item) => item.id === draggingId);
            const toIndex = prev.findIndex((item) => item.id === targetId);
            if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return prev;
            return moveItem(prev, fromIndex, toIndex);
        });
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        if (!draggingId) return;
        const ordered = [...projects];
        setDraggingId(null);
        await persistOrder(ordered);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-black text-slate-900">Projects</h1>
                <button
                    onClick={() => { setForm(empty); setEditId(null); setShowForm(true); }}
                    className="flex items-center gap-2 bg-orange-500 text-white font-bold px-4 py-2.5 rounded-xl text-sm hover:-translate-y-0.5 active:scale-95 transition-all shadow-md shadow-orange-200"
                >
                    <Plus size={16} /> Add Project
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto my-8">
                        <div className="flex items-center justify-between">
                            <h2 className="font-black text-lg text-slate-900">{editId ? "Edit" : "Add"} Project</h2>
                            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-700"><X size={20} /></button>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Project Image</label>
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

                        <input placeholder="Project Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-orange-400" />
                        <input placeholder="Location (e.g. Jaipur, Rajasthan)" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                            className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-orange-400" />
                        <div className="grid grid-cols-2 gap-3">
                            <input placeholder="Capacity (e.g. 50 kW)" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                                className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-orange-400" />
                            <input placeholder="Type (e.g. Commercial)" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                                className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-orange-400" />
                        </div>
                        <input placeholder="Monthly Savings (e.g. ₹80,000/mo)" value={form.saved} onChange={(e) => setForm({ ...form, saved: e.target.value })}
                            className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-orange-400" />

                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Fallback Accent Color</label>
                            <p className="text-[10px] text-slate-400 mb-2">Used if no image is uploaded</p>
                            <div className="flex flex-wrap gap-2">
                                {COLORS.map((c) => (
                                    <button key={c} onClick={() => setForm({ ...form, color: c })}
                                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c} ${form.color === c ? "ring-2 ring-orange-400 ring-offset-2" : ""}`} />
                                ))}
                            </div>
                        </div>

                        <button onClick={handleSave} disabled={uploading || saving}
                            className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white font-black py-3 rounded-xl hover:-translate-y-0.5 active:scale-95 transition-all shadow-md disabled:opacity-50">
                            <Save size={16} /> {saving ? "Saving..." : `${editId ? "Update" : "Add"} Project`}
                        </button>
                    </div>
                </div>
            )}

            {/* List */}
            {loading ? (
                <div className="flex items-center justify-center py-16 text-slate-500">
                    <Loader2 className="animate-spin mr-2" size={18} />
                    Loading projects...
                </div>
            ) : projects.length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                    <p className="text-lg font-bold">No projects yet</p>
                    <p className="text-sm">Click "Add Project" to create one</p>
                </div>
            ) : (
                <div className="space-y-3">
                    <p className="text-xs font-semibold text-slate-500">
                        Drag and drop cards to adjust display order.
                        {ordering && <span className="inline-flex items-center ml-2"><Loader2 className="animate-spin mr-1" size={12} />Saving order...</span>}
                    </p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((p) => (
                        <div
                            key={p.id}
                            draggable
                            onDragStart={() => handleDragStart(p.id)}
                            onDragOver={(e) => handleDragOver(e, p.id)}
                            onDrop={handleDrop}
                            onDragEnd={() => setDraggingId(null)}
                            className={`bg-white rounded-2xl overflow-hidden border shadow-sm cursor-grab active:cursor-grabbing ${draggingId === p.id ? "border-orange-300 opacity-70" : "border-slate-100"}`}
                        >
                            <div className={`h-24 ${!p.image ? `bg-gradient-to-br ${p.color || COLORS[0]}` : "bg-slate-100"} relative flex items-end p-3`}>
                                {p.image && <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover" />}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="relative z-10 flex items-center gap-2">
                                    <GripVertical size={12} className="text-white/80" />
                                    <span className="bg-white/20 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-full">{p.type}</span>
                                </div>

                                <div className="absolute top-2 right-2 z-10 flex gap-1">
                                    <button onClick={() => handleEdit(p)} className="p-1.5 bg-white/90 text-slate-700 hover:text-blue-500 rounded-lg shadow-sm"><Pencil size={12} /></button>
                                    <button onClick={() => handleDelete(p.id)} className="p-1.5 bg-white/90 text-slate-700 hover:text-red-500 rounded-lg shadow-sm"><Trash2 size={12} /></button>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-slate-900 text-sm mb-0.5">{p.title}</h3>
                                <p className="text-slate-400 text-[11px] mb-3">{p.location}</p>
                                <div className="flex justify-between mt-2 text-xs pt-3 border-t border-slate-50">
                                    <span className="text-slate-500"><strong className="text-slate-700">{p.capacity}</strong></span>
                                    <span className="text-emerald-600 font-bold">{p.saved}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                </div>
            )}
        </div>
    );
}

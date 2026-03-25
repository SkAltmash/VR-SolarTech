import { useState, useEffect } from "react";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { Plus, Pencil, Trash2, X, Save, Image as ImageIcon, Loader2, GripVertical, FileText } from "lucide-react";
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

const empty = { title: "", slug: "", content: "", author: "Admin", color: COLORS[0], image: "" };

const sortByPosition = (items) =>
    [...items].sort((a, b) => {
        const aPos = Number.isFinite(Number(a.position)) ? Number(a.position) : 9999;
        const bPos = Number.isFinite(Number(b.position)) ? Number(b.position) : 9999;
        if (aPos !== bPos) return aPos - bPos;
        return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
    });

const generateSlug = (title) => {
    return title.toString().toLowerCase().trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-');
}

export default function AdminBlogs() {
    const [blogs, setBlogs] = useState([]);
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
            collection(db, "blogs"),
            (snap) => {
                setBlogs(sortByPosition(snap.docs.map((d) => ({ id: d.id, ...d.data() }))));
                setLoading(false);
            },
            () => {
                toast.error("Failed to load blogs");
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
        if (!form.title.trim() || !form.content.trim()) {
            toast.error("Title and Content are required");
            return;
        }
        setSaving(true);
        const existing = blogs.find((b) => b.id === editId);

        let finalSlug = form.slug.trim();
        if (!finalSlug) {
            finalSlug = generateSlug(form.title);
        }

        const payload = {
            ...form,
            slug: finalSlug,
            position: editId
                ? (Number.isFinite(Number(existing?.position)) ? Number(existing.position) : blogs.length)
                : blogs.length,
        };
        try {
            if (editId) {
                await updateDoc(doc(db, "blogs", editId), { ...payload, updatedAt: serverTimestamp() });
                toast.success("Blog updated");
            } else {
                await addDoc(collection(db, "blogs"), { ...payload, createdAt: serverTimestamp() });
                toast.success("Blog added");
            }
            setForm(empty);
            setEditId(null);
            setShowForm(false);
        } catch {
            toast.error("Failed to save blog");
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (b) => {
        setForm({
            title: b.title || "",
            slug: b.slug || "",
            content: b.content || "",
            author: b.author || "Admin",
            color: b.color || COLORS[0],
            image: b.image || "",
        });
        setEditId(b.id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this blog?")) {
            try {
                await deleteDoc(doc(db, "blogs", id));
                toast.success("Blog deleted");
            } catch {
                toast.error("Failed to delete blog");
            }
        }
    };

    const moveItem = (list, fromIndex, toIndex) => {
        const next = [...list];
        const [moved] = next.splice(fromIndex, 1);
        next.splice(toIndex, 0, moved);
        return next;
    };

    const persistOrder = async (orderedBlogs) => {
        setOrdering(true);
        const withPositions = orderedBlogs.map((item, index) => ({ ...item, position: index }));
        setBlogs(withPositions);
        try {
            await Promise.all(
                withPositions.map((item, index) =>
                    updateDoc(doc(db, "blogs", item.id), { position: index, updatedAt: serverTimestamp() })
                )
            );
            toast.success("Blog order updated");
        } catch {
            toast.error("Failed to save blog order");
        } finally {
            setOrdering(false);
        }
    };

    const handleDragStart = (id) => setDraggingId(id);

    const handleDragOver = (e, targetId) => {
        e.preventDefault();
        if (!draggingId || draggingId === targetId) return;
        setBlogs((prev) => {
            const fromIndex = prev.findIndex((item) => item.id === draggingId);
            const toIndex = prev.findIndex((item) => item.id === targetId);
            if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return prev;
            return moveItem(prev, fromIndex, toIndex);
        });
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        if (!draggingId) return;
        const ordered = [...blogs];
        setDraggingId(null);
        await persistOrder(ordered);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-black text-slate-900">Blogs</h1>
                <button
                    onClick={() => { setForm(empty); setEditId(null); setShowForm(true); }}
                    className="flex items-center gap-2 bg-orange-500 text-white font-bold px-4 py-2.5 rounded-xl text-sm hover:-translate-y-0.5 active:scale-95 transition-all shadow-md shadow-orange-200"
                >
                    <Plus size={16} /> Add Blog
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
                    <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto my-8">
                        <div className="flex items-center justify-between">
                            <h2 className="font-black text-lg text-slate-900">{editId ? "Edit" : "Add"} Blog</h2>
                            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-700"><X size={20} /></button>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Blog Cover Image</label>
                            <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:bg-slate-50 transition-colors">
                                {form.image ? (
                                    <div className="relative group rounded-lg overflow-hidden">
                                        <img src={form.image} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="text-white text-xs font-bold">Change Image</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="py-8">
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Title</label>
                                <input placeholder="Blog Title" value={form.title} onChange={(e) => {
                                    setForm({
                                        ...form,
                                        title: e.target.value,
                                        // Auto-generate slug dynamically only when adding new
                                        slug: editId ? form.slug : generateSlug(e.target.value)
                                    });
                                }}
                                    className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-orange-400" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Slug URL</label>
                                <input placeholder="blog-url-slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
                                    className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-orange-400 bg-slate-50" />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Author</label>
                            <input placeholder="Author Name" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })}
                                className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-orange-400" />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-1">Content</label>
                            <textarea placeholder="Write your blog content here..." value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
                                className="w-full h-48 border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-orange-400 resize-none" />
                        </div>

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
                            <Save size={16} /> {saving ? "Saving..." : `${editId ? "Update" : "Add"} Blog`}
                        </button>
                    </div>
                </div>
            )}

            {/* List */}
            {loading ? (
                <div className="flex items-center justify-center py-16 text-slate-500">
                    <Loader2 className="animate-spin mr-2" size={18} />
                    Loading blogs...
                </div>
            ) : blogs.length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                    <p className="text-lg font-bold">No blogs yet</p>
                    <p className="text-sm">Click "Add Blog" to create one</p>
                </div>
            ) : (
                <div className="space-y-3">
                    <p className="text-xs font-semibold text-slate-500">
                        Drag and drop items to adjust display order.
                        {ordering && <span className="inline-flex items-center ml-2"><Loader2 className="animate-spin mr-1" size={12} />Saving order...</span>}
                    </p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {blogs.map((b) => (
                            <div
                                key={b.id}
                                draggable
                                onDragStart={() => handleDragStart(b.id)}
                                onDragOver={(e) => handleDragOver(e, b.id)}
                                onDrop={handleDrop}
                                onDragEnd={() => setDraggingId(null)}
                                className={`flex flex-col bg-white rounded-2xl overflow-hidden border shadow-sm cursor-grab active:cursor-grabbing ${draggingId === b.id ? "border-orange-300 opacity-70" : "border-slate-100"}`}
                            >
                                <div className={`h-32 ${!b.image ? `bg-gradient-to-br ${b.color || COLORS[0]}` : "bg-slate-100"} relative flex items-end p-3`}>
                                    {b.image && <img src={b.image} alt={b.title} className="absolute inset-0 w-full h-full object-cover" />}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="relative z-10 flex items-center gap-2">
                                        <GripVertical size={12} className="text-white/80" />
                                        <span className="bg-white/20 backdrop-blur text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1"><FileText size={10} /> Blog</span>
                                    </div>

                                    <div className="absolute top-2 right-2 z-10 flex gap-1">
                                        <button onClick={() => handleEdit(b)} className="p-1.5 bg-white/90 text-slate-700 hover:text-blue-500 rounded-lg shadow-sm"><Pencil size={12} /></button>
                                        <button onClick={() => handleDelete(b.id)} className="p-1.5 bg-white/90 text-slate-700 hover:text-red-500 rounded-lg shadow-sm"><Trash2 size={12} /></button>
                                    </div>
                                </div>
                                <div className="p-4 flex-1 flex flex-col">
                                    <h3 className="font-bold text-slate-900 text-sm mb-1 line-clamp-2">{b.title}</h3>
                                    <p className="text-slate-400 text-[11px] mb-3 line-clamp-1 flex-1">/{b.slug}</p>
                                    <div className="flex justify-between items-center mt-2 text-xs pt-3 border-t border-slate-50">
                                        <span className="text-slate-500">By <strong className="text-slate-700">{b.author || 'Admin'}</strong></span>
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

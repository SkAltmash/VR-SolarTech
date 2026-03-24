import { useState, useEffect } from "react";
import { collection, deleteDoc, doc, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import { Trash2, MessageSquare, Phone, User, Clock, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminMessages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
        const unsub = onSnapshot(
            q,
            (snap) => {
                setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
                setLoading(false);
            },
            () => {
                toast.error("Failed to load messages");
                setLoading(false);
            }
        );
        return unsub;
    }, []);

    const handleDelete = async (id) => {
        if (confirm("Delete this message?")) {
            try {
                await deleteDoc(doc(db, "contacts", id));
                toast.success("Message deleted");
            } catch {
                toast.error("Failed to delete message");
            }
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-black text-slate-900">Messages</h1>
                <span className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1.5 rounded-full">
                    {messages.length} total
                </span>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-16 text-slate-500">
                    <Loader2 className="animate-spin mr-2" size={18} />
                    Loading messages...
                </div>
            ) : messages.length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                    <MessageSquare size={40} className="mx-auto mb-3 opacity-40" />
                    <p className="text-lg font-bold">No messages yet</p>
                    <p className="text-sm">Submitted contact forms will appear here</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {messages.map((m) => (
                        <div key={m.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-3 mb-2">
                                        <span className="flex items-center gap-1.5 text-slate-900 font-bold text-sm">
                                            <User size={14} className="text-slate-400" /> {m.name || "—"}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold">
                                            <Phone size={12} /> {m.phone || "—"}
                                        </span>
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 rounded-xl p-3">{m.message || "No message"}</p>
                                    {m.createdAt && (
                                        <p className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium mt-2">
                                            <Clock size={11} />
                                            {m.createdAt.toDate?.().toLocaleString("en-IN") || "—"}
                                        </p>
                                    )}
                                </div>
                                <button onClick={() => handleDelete(m.id)}
                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0">
                                    <Trash2 size={15} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

import { useState, useEffect } from "react";
import { collection, doc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { Plus, Trash2, Save, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminROI() {
    const [dataPoints, setDataPoints] = useState([]);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onSnapshot(
            doc(db, "settings", "roiData"),
            (snap) => {
                if (snap.exists()) {
                    setDataPoints(snap.data().dataPoints || []);
                } else {
                    setDataPoints([
                        { bill: 1000, kw: 2.7, cost: 180000, subsidy: 72600, net: 107400, roi: 3.5 },
                        { bill: 2000, kw: 3.0, cost: 190000, subsidy: 78000, net: 112000, roi: 3.3 },
                        { bill: 2600, kw: 3.3, cost: 195000, subsidy: 78000, net: 117000, roi: 3.1 },
                        { bill: 3200, kw: 3.8, cost: 220000, subsidy: 78000, net: 142000, roi: 3.2 },
                        { bill: 3700, kw: 4.3, cost: 245000, subsidy: 78000, net: 167000, roi: 3.4 },
                        { bill: 4500, kw: 4.9, cost: 295000, subsidy: 78000, net: 217000, roi: 3.8 },
                        { bill: 5000, kw: 5.3, cost: 310000, subsidy: 78000, net: 232000, roi: 3.9 },
                        { bill: 6000, kw: 6.5, cost: 380000, subsidy: 78000, net: 302000, roi: 4.0 },
                        { bill: 7000, kw: 7.5, cost: 450000, subsidy: 78000, net: 372000, roi: 4.1 },
                        { bill: 8000, kw: 8.5, cost: 520000, subsidy: 78000, net: 442000, roi: 4.2 },
                        { bill: 9000, kw: 9.5, cost: 590000, subsidy: 78000, net: 512000, roi: 4.3 },
                        { bill: 10000, kw: 10.5, cost: 650000, subsidy: 78000, net: 572000, roi: 4.5 },
                    ]);
                }
                setLoading(false);
            },
            () => {
                toast.error("Failed to load ROI data");
                setLoading(false);
            }
        );
        return unsub;
    }, []);

    const updateField = (index, field, value) => {
        const updated = [...dataPoints];
        updated[index] = { ...updated[index], [field]: parseFloat(value) || 0 };
        setDataPoints(updated);
    };

    const addRow = () => {
        setDataPoints([...dataPoints, { bill: 0, kw: 0, cost: 0, subsidy: 0, net: 0, roi: 0 }]);
    };

    const removeRow = (index) => {
        setDataPoints(dataPoints.filter((_, i) => i !== index));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await setDoc(doc(db, "settings", "roiData"), { dataPoints });
            toast.success("ROI data saved");
        } catch {
            toast.error("Failed to save ROI data");
        } finally {
            setSaving(false);
        }
    };

    const fields = ["bill", "kw", "cost", "subsidy", "net", "roi"];
    const labels = ["Bill (₹)", "kW", "Cost (₹)", "Subsidy (₹)", "Net (₹)", "ROI (Yrs)"];

    return (
        <div>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <h1 className="text-2xl font-black text-slate-900">ROI Data Points</h1>
                <div className="flex gap-2">
                    <button onClick={addRow}
                        className="flex items-center gap-2 bg-slate-100 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-sm hover:bg-slate-200 transition-colors">
                        <Plus size={16} /> Add Row
                    </button>
                    <button onClick={handleSave} disabled={saving}
                        className="flex items-center gap-2 bg-orange-500 text-white font-bold px-4 py-2.5 rounded-xl text-sm hover:-translate-y-0.5 active:scale-95 transition-all shadow-md shadow-orange-200 disabled:opacity-50">
                        <Save size={16} /> {saving ? "Saving..." : "Save All"}
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-16 text-slate-500">
                    <Loader2 className="animate-spin mr-2" size={18} />
                    Loading ROI data...
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-slate-100">
                            {labels.map((l) => (
                                <th key={l} className="text-left px-3 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">{l}</th>
                            ))}
                            <th className="w-10" />
                        </tr>
                    </thead>
                    <tbody>
                        {dataPoints.map((dp, i) => (
                            <tr key={i} className="border-b border-slate-50 hover:bg-slate-50">
                                {fields.map((f) => (
                                    <td key={f} className="px-2 py-1.5">
                                        <input
                                            type="number"
                                            value={dp[f]}
                                            onChange={(e) => updateField(i, f, e.target.value)}
                                            className="w-full bg-transparent border border-slate-100 rounded-lg px-2 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-orange-400 transition-colors"
                                        />
                                    </td>
                                ))}
                                <td className="px-2 py-1.5">
                                    <button onClick={() => removeRow(i)} className="text-slate-300 hover:text-red-500 p-1"><Trash2 size={14} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            )}

            <p className="text-slate-400 text-xs mt-3 font-medium">
                ⚠️ Click "Save All" after making changes. Data is sorted by bill amount in the calculator.
            </p>
        </div>
    );
}

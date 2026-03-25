import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { Loader2, User, ArrowRight } from "lucide-react";
import SEO from "../componnets/SEO";

export default function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
                const snap = await getDocs(q);
                // Also respect the position field if it exists to maintain parity with Admin view dragging
                // though strictly admin orders by position on load. We'll sort by position locally just in case.
                const fetchedBlogs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                fetchedBlogs.sort((a, b) => {
                    const aPos = Number.isFinite(Number(a.position)) ? Number(a.position) : 9999;
                    const bPos = Number.isFinite(Number(b.position)) ? Number(b.position) : 9999;
                    if (aPos !== bPos) return aPos - bPos;
                    return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
                });

                setBlogs(fetchedBlogs);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-16 bg-slate-50 flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-20 bg-slate-50 relative overflow-hidden">
            <SEO
                title="Insights & Updates"
                description="Stay informed with the latest trends in solar technology, sustainable energy, and our company news."
                keywords="solar blog, renewable energy news, solar technology updates"
            />
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-[28rem] bg-slate-900 -skew-y-2 origin-top-left z-0" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16 pt-10">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
                        Insights & <span className="text-orange-500">Updates</span>
                    </h1>
                    <p className="text-slate-300 max-w-2xl mx-auto text-lg">
                        Stay informed with the latest trends in solar technology, sustainable energy, and our company news.
                    </p>
                </div>

                {blogs.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">No blogs found</h3>
                        <p className="text-slate-500">Check back later for new updates.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog) => (
                            <Link
                                to={`/blog/${blog.slug}`}
                                key={blog.id}
                                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 flex flex-col"
                            >
                                <div className={`h-60 relative overflow-hidden ${!blog.image ? `bg-linear-to-br ${blog.color || "from-orange-400 to-amber-400"}` : "bg-slate-200"}`}>
                                    {blog.image && (
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10 text-white/90 text-sm font-medium">
                                        <span className="flex items-center gap-1.5 backdrop-blur-md bg-black/30 px-3 py-1.5 rounded-full shadow-sm text-xs border border-white/10">
                                            <User size={12} /> {blog.author || "Admin"}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-orange-500 transition-colors">
                                        {blog.title}
                                    </h3>
                                    <p className="text-slate-600 line-clamp-3 mb-6 flex-1 text-sm leading-relaxed">
                                        {blog.content}
                                    </p>

                                    <div className="flex items-center text-orange-500 font-bold text-sm tracking-wide group/link mt-auto">
                                        Read Full Article
                                        <ArrowRight size={16} className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

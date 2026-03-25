import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../firebase";
import { User, ArrowRight, Loader2 } from "lucide-react";

export default function HomeBlogSection() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"), limit(2));
                const snap = await getDocs(q);
                setBlogs(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            } catch (error) {
                console.error("Error fetching latest blogs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <section className="py-24 bg-slate-50 flex justify-center items-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </section>
        );
    }

    if (blogs.length === 0) return null;

    return (
        <section className="py-24 bg-slate-50 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-px w-8 bg-orange-500" />
                            <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">
                                Latest News
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                            Insights & Updates
                        </h2>
                    </div>
                    <Link
                        to="/blogs"
                        className="inline-flex items-center gap-2 text-orange-500 font-bold hover:text-orange-600 transition-colors group"
                    >
                        View All Articles
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {blogs.map((blog) => (
                        <Link
                            to={`/blog/${blog.slug}`}
                            key={blog.id}
                            className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 flex flex-col sm:flex-row h-full"
                        >
                            <div className={`sm:w-2/5 h-60 sm:h-auto relative overflow-hidden ${!blog.image ? `bg-linear-to-br ${blog.color || "from-orange-400 to-amber-400"}` : "bg-slate-200"}`}>
                                {blog.image && (
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                )}
                                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 z-10">
                                    <span className="inline-flex items-center gap-1.5 backdrop-blur-md bg-white/20 px-2.5 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-wider border border-white/10">
                                        <User size={10} /> {blog.author || "Admin"}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 sm:p-8 sm:w-3/5 flex flex-col justify-center">
                                <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-orange-500 transition-colors leading-tight">
                                    {blog.title}
                                </h3>
                                <p className="text-slate-600 line-clamp-3 mb-6 flex-1 text-sm leading-relaxed">
                                    {blog.content}
                                </p>

                                <div className="flex items-center text-orange-500 font-bold text-sm tracking-wide mt-auto group/link">
                                    Read Article
                                    <ArrowRight size={16} className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

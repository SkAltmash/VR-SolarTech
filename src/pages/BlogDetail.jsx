import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { Loader2, ArrowLeft, User, Calendar } from "lucide-react";
import SEO from "../componnets/SEO";

export default function BlogDetail() {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const q = query(collection(db, "blogs"), where("slug", "==", slug));
                const snap = await getDocs(q);
                if (!snap.empty) {
                    const docData = snap.docs[0];
                    setBlog({ id: docData.id, ...docData.data() });
                }
            } catch (error) {
                console.error("Error fetching blog:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-16 bg-white flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen pt-32 pb-16 bg-slate-50 flex flex-col items-center justify-center px-4">
                <h2 className="text-3xl font-black text-slate-900 mb-4">Article Not Found</h2>
                <p className="text-slate-500 mb-8 text-center text-lg">The article you are looking for might have been removed or the URL is incorrect.</p>
                <Link to="/blogs" className="bg-orange-500 text-white font-bold px-6 py-3 rounded-xl hover:-translate-y-0.5 active:scale-95 transition-all shadow-md shadow-orange-200 flex items-center gap-2">
                    <ArrowLeft size={18} /> Back to Insights
                </Link>
            </div>
        );
    }

    const createdDate = blog.createdAt?.seconds
        ? new Date(blog.createdAt.seconds * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : 'Recently';

    return (
        <div className="min-h-screen bg-slate-50 pb-24">
            <SEO
                title={blog.title}
                description={blog.content ? blog.content.substring(0, 160) + "..." : "Read our latest blog at VR SolarTech."}
            />
            {/* Hero Section */}
            <div className={`relative pt-32 pb-24 md:pt-40 md:pb-40 px-6 ${!blog.image ? `bg-linear-to-br ${blog.color || "from-slate-800 to-slate-900"}` : "bg-slate-900"}`}>
                {blog.image && (
                    <div className="absolute inset-0 z-0">
                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply" />
                        <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/80 to-slate-900/20" />
                    </div>
                )}

                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <Link to="/blogs" className="inline-flex items-center text-orange-400 hover:text-white transition-colors text-sm font-bold tracking-widest uppercase mb-8 group bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to all articles
                    </Link>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight mb-8 tracking-tight">
                        {blog.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-slate-300 font-medium text-sm sm:text-base">
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                            <span className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center"><User size={14} className="text-white" /></span>
                            <span className="text-white font-semibold">{blog.author || "Admin"}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                            <Calendar size={16} className="text-orange-400" />
                            <span className="text-white font-semibold">{createdDate}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-3xl mx-auto px-6 pt-12 -mt-20 relative z-20">
                <div className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 md:p-12 lg:p-16">
                    <div className="prose prose-lg md:prose-xl prose-slate max-w-none prose-headings:font-black prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-orange-500 hover:prose-a:text-orange-600 prose-img:rounded-2xl">
                        {blog.content.split('\n').map((paragraph, idx) => (
                            paragraph.trim() ? <p key={idx} className="mb-6">{paragraph}</p> : <br key={idx} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

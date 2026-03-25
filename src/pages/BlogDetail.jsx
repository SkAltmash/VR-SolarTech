import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { Loader2, ArrowLeft, User, Calendar, Clock, Share2 } from "lucide-react";
import SEO from "../componnets/SEO";

export default function BlogDetail() {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Handle Scroll Progress
    useEffect(() => {
        const updateScroll = () => {
            const currentScroll = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            setScrollProgress((currentScroll / scrollHeight) * 100);
        };
        window.addEventListener("scroll", updateScroll);
        return () => window.removeEventListener("scroll", updateScroll);
    }, []);

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
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
                    <p className="text-slate-400 font-medium animate-pulse">Loading Insight...</p>
                </div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-slate-50">
                <h2 className="text-4xl font-black text-slate-900 mb-2">404</h2>
                <p className="text-slate-500 mb-8 text-lg">We couldn't find that article.</p>
                <Link to="/blogs" className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold transition-transform hover:scale-105">
                    Back to Blog
                </Link>
            </div>
        );
    }

    const createdDate = blog.createdAt?.seconds
        ? new Date(blog.createdAt.seconds * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : 'Recently';

    // Estimate Read Time (simple version)
    const readTime = blog.content ? Math.ceil(blog.content.split(' ').length / 200) : 1;

    return (
        <div className="min-h-screen bg-white selection:bg-orange-100">
            <SEO
                title={blog.title}
                description={blog.content?.substring(0, 160) + "..."}
            />

            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1.5 z-50 bg-slate-100">
                <div
                    className="h-full bg-orange-500 transition-all duration-150 ease-out"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            <article className="pt-32 pb-24">
                {/* Header Section */}
                <header className="max-w-4xl mx-auto px-6 mb-12 text-center">
                    <Link to="/blogs" className="inline-flex items-center text-orange-600 font-bold text-xs uppercase tracking-widest mb-6 hover:gap-2 transition-all">
                        <ArrowLeft size={14} className="mr-1" /> Back to Insights
                    </Link>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
                        {blog.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-center gap-6 text-slate-500 text-sm border-y border-slate-100 py-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                                <User size={16} />
                            </div>
                            <span className="font-bold text-slate-900">{blog.author || "VR SolarTech Admin"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-orange-500" />
                            <span>{createdDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={16} className="text-orange-500" />
                            <span>{readTime} min read</span>
                        </div>
                    </div>
                </header>

                {/* Pro Featured Image - No longer in background */}
                {blog.image && (
                    <div className="max-w-6xl mx-auto px-6 mb-16">
                        <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                )}

                {/* Content Section */}
                <div className="max-w-3xl mx-auto px-6">
                    <div className="prose prose-lg md:prose-xl prose-slate max-w-none 
                        prose-headings:text-slate-900 prose-headings:font-black 
                        prose-p:text-slate-600 prose-p:leading-relaxed 
                        prose-strong:text-slate-900
                        prose-blockquote:border-l-orange-500 prose-blockquote:bg-orange-50/50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl
                        prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline
                        prose-img:rounded-3xl">

                        {blog.content.split('\n').map((paragraph, idx) => (
                            paragraph.trim() ? (
                                <p key={idx}>{paragraph}</p>
                            ) : (
                                <span key={idx} className="block h-4" />
                            )
                        ))}
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-16 pt-8 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex gap-4">
                            <button className="p-3 rounded-full bg-slate-50 text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition-colors">
                                <Share2 size={20} />
                            </button>
                        </div>
                        <div className="text-sm text-slate-400 font-medium italic">
                            Thanks for reading VR SolarTech Insights
                        </div>
                    </div>
                </div>
            </article>

            {/* Newsletter CTA or Related Post could go here */}
        </div>
    );
}
import { Ghost, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center bg-white px-6 border border-green-800 h-screen">
            {/* Ghost */}
            <div className="animate-[float_4s_ease-in-out_infinite]">
                <Ghost size={64} className="text-zinc-300" strokeWidth={1.5}  />
            </div>

            {/* Text */}
            <p className="text-zinc-400 mt-8 text-sm tracking-widest uppercase font-adlam">
                Error 404
            </p>
            <h1 className="text-3xl md:text-4xl font-light text-zinc-800 mt-2 text-center font-adlam">
                Page not found
            </h1>

            {/* Link */}
            <Link
                to="/"
                className="group flex items-center gap-2 mt-8 text-zinc-600 hover:text-zinc-800 transition-colors"
            >
                <span className="text-sm font-medium">Return home</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Animation */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    25% { transform: translateY(-10px) rotate(-5deg); }
                    75% { transform: translateY(-10px) rotate(5deg); }
                }
            `}</style>
        </div>
    );
}

export default NotFound;
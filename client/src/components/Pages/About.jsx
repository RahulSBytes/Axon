import React from 'react';
import {
    MessageSquare,
    History,
    Bookmark,
    Shield,
    Zap,
    Github,
    Linkedin,
    Mail,
    Heart,
    Brain,
    Layers,
    Cpu,
    ArrowRight,
    Search,
    Wrench,
    FileDown,
    Code,
    Pin,
    LogIn
} from 'lucide-react';
import { createNewChat } from '../../utils/helpers.js';
import { useNavigate } from 'react-router-dom';
import Mobnav from '../Layouts/Mobnav.jsx';




function About() {
    const navigate = useNavigate()


    const features = [
        {
            icon: Zap,
            title: "Groq-Powered LLM",
            description: "Ultra-fast AI responses powered by Groq's high-speed inference engine."
        },
        {
            icon: Search,
            title: "Live Web Search",
            description: "Tavily-powered search for real-time, web-sourced answers."
        },
        {
            icon: Wrench,
            title: "AI Tool Calling",
            description: "Intelligent function execution for dynamic, actionable responses."
        },
        {
            icon: FileDown,
            title: "Export as PDF",
            description: "Download your entire conversation as a beautifully formatted PDF."
        },
        {
            icon: Code,
            title: "Code Snippet Export",
            description: "Save code blocks as shareable syntax-highlighted images."
        },
        {
            icon: Brain,
            title: "Context Memory",
            description: "AI remembers your conversation for smarter, relevant responses."
        },
        {
            icon: Bookmark,
            title: "Save Messages",
            description: "Bookmark individual responses to build your knowledge base."
        },
        {
            icon: Pin,
            title: "Pin Conversations",
            description: "Pin important chats to the top for instant access."
        },
        {
            icon: History,
            title: "Chat History",
            description: "All conversations saved, searchable, and always accessible."
        },
        {
            icon: LogIn,
            title: "Google & Local Auth",
            description: "Secure sign-in with Google OAuth or email/password."
        }
    ];

    const techStack = [
        "React 19",
        "Node.js",
        "Express",
        "MongoDB",
        "Passport.js",
        "Groq SDK",
        "Tavily API",
        "Tailwind CSS"
    ];

    return (
        // KEY FIX: Use h-full and overflow-y-auto here
        <div className="h-full overflow-y-auto bg-zinc-50">
            {/* Inner wrapper - no overflow settings */}
            <div className="min-h-full">
                <div className='w-full flex justify-between items-center h-24 px-4 md:hidden'>
                    <span className='font-adlam text-2xl cursor-pointer'>About</span>
                    <div className='flex gap-4'>
                        <Mobnav />
                    </div>
                </div>
                {/* Hero Section */}
                <section className="bg-zinc-900 text-white px-6 py-16 md:py-20">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center border border-zinc-700">
                                <img src="/Logo2.png" alt="logo" />
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Axon</h1>

                        <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-8">
                            A multi-model AI agent powered by cutting-edge LLMs.
                            Seamlessly switch between models for coding, creativity, and complex reasoning.
                        </p>

                        <div className="flex flex-wrap justify-center gap-2">
                            {techStack.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-3 py-1 bg-zinc-800 border border-zinc-700 rounded-full text-sm text-zinc-400"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="bg-white border-b border-zinc-200 px-6 py-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            {[
                                { value: "4+", label: "AI Models" },
                                { value: "Fast", label: "Response" },
                                { value: "100%", label: "Secure" },
                                { value: "∞", label: "Possibilities" }
                            ].map(({ value, label }) => (
                                <div key={label}>
                                    <div className="text-2xl md:text-3xl font-bold text-zinc-800">{value}</div>
                                    <div className="text-sm text-zinc-500">{label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="px-6 py-14">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-zinc-800 text-center mb-10">
                            What Makes Axon Different
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {features.map(({ icon: Icon, title, description }) => (
                                <div key={title} className="bg-white p-5 rounded-xl border border-zinc-200">
                                    <div className="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center mb-3">
                                        <Icon size={20} className="text-zinc-700" />
                                    </div>
                                    <h3 className="text-base font-semibold text-zinc-800 mb-1">{title}</h3>
                                    <p className="text-zinc-500 text-sm">{description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section className="bg-zinc-900 text-white px-6 py-14">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
                            Simple Yet Powerful
                        </h2>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                            {[
                                { step: "01", title: "Ask", desc: "Type your question" },
                                { step: "02", title: "Process", desc: "AI finds the answer" },
                                { step: "03", title: "Result", desc: "Get instant response" }
                            ].map((item, index) => (
                                <React.Fragment key={item.step}>
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-zinc-800 border border-zinc-700 rounded-xl flex items-center justify-center text-lg font-bold mx-auto mb-3">
                                            {item.step}
                                        </div>
                                        <h3 className="font-semibold mb-1">{item.title}</h3>
                                        <p className="text-sm text-zinc-400">{item.desc}</p>
                                    </div>
                                    {index < 2 && (
                                        <div className="hidden md:block w-10 h-px bg-zinc-700" />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Developer Section */}
                <section className="px-6 py-14">
                    <div className="max-w-xl mx-auto">
                        <h2 className="text-2xl font-bold text-zinc-800 text-center mb-8">
                            Meet the Developer
                        </h2>

                        <div className="bg-white p-6 md:p-8 rounded-2xl border border-zinc-200">
                            <div className="text-center mb-5">
                                <div className="w-20 h-20 bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-white">RS</span>
                                </div>
                                <h3 className="text-xl font-bold text-zinc-800">Rahul Sharma</h3>
                                <p className="text-zinc-500 text-sm">Full Stack Developer • Mastering GenAI</p>
                            </div>

                            <p className="text-zinc-600 text-sm leading-relaxed text-center mb-5">
                                Experienced Full Stack Developer on a mission to master Gen AI. I built Axon to understand LLMs from the inside out — integrating models, crafting prompts,
                                and shipping a complete AI product.
                            </p>

                            <div className="flex flex-wrap justify-center gap-2 mb-5">
                                {['GenAI', 'React', 'Node.js', 'MongoDB', 'Tailwind'].map((skill) => (
                                    <span key={skill} className="px-2 py-1 bg-zinc-100 text-zinc-600 text-xs rounded-md">
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            <div className="flex justify-center gap-2">
                                <a href="https://github.com/RahulSBytes" target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-100 rounded-lg">
                                    <Github size={18} className="text-zinc-700" />
                                </a>
                                <a href="https://www.linkedin.com/in/thedevrahul" target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-100 rounded-lg">
                                    <Linkedin size={18} className="text-zinc-700" />
                                </a>
                                <a href="mailto:rraj25198@gmail.com" className="p-2 bg-zinc-100 rounded-lg">
                                    <Mail size={18} className="text-zinc-700" />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-zinc-800 text-white px-6 py-12">
                    <div className="max-w-xl mx-auto text-center">
                        <h2 className="text-xl md:text-2xl font-bold mb-3">Ready to Try Axon?</h2>
                        <p className="text-zinc-400 text-sm mb-6">
                            Start a conversation and see what multi-model AI can do.
                        </p>
                        <button onClick={(e) => createNewChat(e, navigate)} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-zinc-900 font-semibold rounded-lg">
                            Start Chatting
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </section>

                {/* Footer */}
                <footer className="px-6 py-6 bg-white border-t border-zinc-200">
                    <div className="max-w-4xl mx-auto text-center">
                        <p className="text-zinc-500 text-sm flex items-center justify-center gap-1">
                            Made with <Heart size={14} className="text-red-500 fill-red-500" /> by Rahul Sharma
                        </p>
                        <p className="text-zinc-400 text-xs mt-1">© {new Date().getFullYear()} Axon</p>
                    </div>
                </footer>

            </div>
        </div>
    );
}

export default About;
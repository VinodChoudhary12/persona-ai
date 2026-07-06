import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Message from "./Message";

const PERSONA_META = {
    hitesh: { name: "Hitesh", emoji: "☕", color: "bg-amber-500" },
    piyush: { name: "Piyush", emoji: "🚀", color: "bg-indigo-500" },
};

function Chat({ persona, onToggleSidebar }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const bottomRef = useRef(null);
    const textareaRef = useRef(null);

    const meta = PERSONA_META[persona] ?? { name: persona, emoji: "🤖", color: "bg-slate-500" };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    function handleInputChange(e) {
        setInput(e.target.value);
        const el = textareaRef.current;
        if (el) {
            el.style.height = "auto";
            el.style.height = Math.min(el.scrollHeight, 200) + "px";
        }
    }

    async function sendMessage() {
        const text = input.trim();
        if (!text || loading) return;

        setMessages(prev => [...prev, { role: "user", text }]);
        setInput("");
        if (textareaRef.current) textareaRef.current.style.height = "auto";
        setLoading(true);
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
        try {
            const res = await axios.post(`${API_URL}/api/chat`, {
                persona,
                message: text,
            });

            setMessages(prev => [...prev, { role: "assistant", text: res.data.answer }]);
        } catch {
            setMessages(prev => [
                ...prev,
                { role: "assistant", text: "Something went wrong. Please try again.", error: true },
            ]);
        } finally {
            setLoading(false);
        }
    }

    function handleKeyDown(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }

    return (
        <div className="flex h-full flex-1 flex-col bg-[#212121]">
            {/* Header */}
            <header className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
                <button
                    onClick={onToggleSidebar}
                    className="rounded-lg p-2 text-gray-300 transition hover:bg-white/10 lg:hidden"
                    aria-label="Toggle sidebar"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
                    </svg>
                </button>
                <span className={`flex h-8 w-8 items-center justify-center rounded-full text-base ${meta.color}`}>
                    {meta.emoji}
                </span>
                <div>
                    <h1 className="text-sm font-semibold text-gray-100">{meta.name}</h1>
                    <p className="text-xs text-gray-500">Always ready to help</p>
                </div>
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto">
                <div className="mx-auto flex h-full max-w-3xl flex-col px-4">
                    {messages.length === 0 && !loading ? (
                        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
                            <span className={`flex h-14 w-14 items-center justify-center rounded-full text-3xl ${meta.color}`}>
                                {meta.emoji}
                            </span>
                            <h2 className="text-2xl font-semibold text-gray-100">
                                Chat with {meta.name}
                            </h2>
                            <p className="max-w-sm text-sm text-gray-500">
                                Ask a question, brainstorm an idea, or just say hello to get started.
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-start gap-6 py-6 ">
                            {messages.map((msg, index) => (
                                <Message key={index} message={msg} meta={meta} />
                            ))}
                            {loading && <TypingIndicator meta={meta} />}
                            <div ref={bottomRef} />
                        </div>
                    )}
                </div>
            </div>

            {/* Composer */}
            <div className="border-t border-white/10 bg-[#212121] px-4 py-4">
                <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-white/10 bg-[#2f2f2f] px-3 py-2 shadow-lg transition focus-within:border-white/20">
                    <textarea
                        ref={textareaRef}
                        rows={1}
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder={`Message ${meta.name}...`}
                        className="max-h-[200px] flex-1 resize-none bg-transparent py-2 text-sm text-gray-100 placeholder-gray-500 outline-none"
                    />
                    <button
                        onClick={sendMessage}
                        disabled={loading || !input.trim()}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-black transition disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/40"
                        aria-label="Send message"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                <p className="mx-auto mt-2 max-w-3xl text-center text-xs text-gray-500">
                    Created By Vinod
                </p>
            </div>
        </div>
    );
}

function TypingIndicator({ meta }) {
    return (
        <div className="flex items-start gap-3">
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base ${meta.color}`}>
                {meta.emoji}
            </span>
            <div className="flex items-center gap-1 rounded-2xl bg-[#2f2f2f] px-4 py-3">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" />
            </div>
        </div>
    );
}

export default Chat;
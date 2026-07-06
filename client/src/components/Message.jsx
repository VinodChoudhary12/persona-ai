import { useState } from "react";

function Message({ message, meta }) {
    const [copied, setCopied] = useState(false);
    const isUser = message.role === "user";

    function handleCopy() {
        navigator.clipboard.writeText(message.text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    }

    if (isUser) {
        return (
            <div className="flex w-full justify-end text-left">
                <div className="max-w-[75%] rounded-2xl bg-[#2f2f2f] px-4 py-2.5 text-sm leading-relaxed text-gray-100">
                    {message.text}
                </div>
            </div>
        );
    }

    return (
        <div className="group flex w-full items-start gap-3 text-left">
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base ${meta.color}`}>
                {meta.emoji}
            </span>
            <div className="flex-1 pt-1">
                <p
                    className={`whitespace-pre-wrap text-sm leading-relaxed ${message.error ? "text-red-400" : "text-gray-100"
                        }`}
                >
                    {message.text}
                </p>
                <button
                    onClick={handleCopy}
                    className="mt-2 flex items-center gap-1 text-xs text-gray-500 opacity-0 transition group-hover:opacity-100 hover:text-gray-300"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" />
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                    </svg>
                    {copied ? "Copied" : "Copy"}
                </button>
            </div>
        </div>
    );
}

export default Message;

const PERSONAS = [
    { id: "hitesh", name: "Hitesh", emoji: "☕", color: "bg-amber-500" },
    { id: "piyush", name: "Piyush", emoji: "🚀", color: "bg-indigo-500" },
];

function Sidebar({ persona, setPersona, isOpen, onClose }) {
    return (
        <>
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 z-20 bg-black/50 lg:hidden"
                />
            )}

            <aside
                className={`fixed z-30 flex h-full w-64 shrink-0 flex-col bg-[#171717] p-3 transition-transform duration-200 lg:relative lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex items-center gap-2 px-2 py-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
                        P
                    </span>
                    <h2 className="text-sm font-semibold text-gray-100">Persona AI</h2>
                </div>

                {/* <button className="mb-4 flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2.5 text-sm text-gray-200 transition hover:bg-white/5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                    </svg>
                    New chat
                </button> */}

                <p className="mb-1 px-2 text-xs font-medium text-gray-500">Personas</p>
                <div className="flex flex-col gap-1">
                    {PERSONAS.map(p => (
                        <button
                            key={p.id}
                            onClick={() => setPersona(p.id)}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${persona === p.id
                                    ? "bg-white/10 text-white"
                                    : "text-gray-300 hover:bg-white/5"
                                }`}
                        >
                            <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${p.color}`}>
                                {p.emoji}
                            </span>
                            {p.name}
                        </button>
                    ))}
                </div>

                {/* <div className="mt-auto flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-gray-300 transition hover:bg-white/5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-600 text-xs">
                        U
                    </span>
                    Your account
                </div> */}
            </aside>
        </>
    );
}

export default Sidebar;
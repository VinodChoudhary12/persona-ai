import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

function Home() {

    const [persona, setPersona] = useState("hitesh");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (

        <div className="flex h-screen overflow-hidden bg-[#212121] text-gray-100 ">

            <Sidebar
                persona={persona}
                setPersona={(p) => {
                    setPersona(p);
                    setSidebarOpen(false);
                }}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <Chat
                persona={persona}
                onToggleSidebar={() => setSidebarOpen(o => !o)}
            />
        </div>

    );

}

export default Home;
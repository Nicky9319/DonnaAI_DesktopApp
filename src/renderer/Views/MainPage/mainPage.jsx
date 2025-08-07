import React, { useState } from 'react';

// --- SidebarItem with Tooltip ---
const SidebarItem = ({ icon, label, isActive, onClick }) => (
    <div
        className={`flex items-center justify-center w-16 h-16 cursor-pointer transition-colors relative group ${isActive ? 'bg-[#252830]' : ''}`}
        onClick={onClick}
        style={{ color: '#F9FAFB' }}
    >
        {icon}
        {/* Tooltip on hover */}
        <span className="absolute left-20 top-1/2 -translate-y-1/2 px-3 py-1 rounded bg-[#252830] text-[#F9FAFB] text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap shadow-lg z-10 pointer-events-none transition-opacity">
            {label}
        </span>
    </div>
);

// --- Sidebar ---
const Sidebar = ({ activeTab, setActiveTab }) => (
    <div className="w-20 h-screen shadow-lg flex flex-col items-center py-4" style={{ backgroundColor: '#1D1F24' }}>
        <div className="mb-8">
            <img src="/favicon.ico" alt="Donna" className="w-10 h-10 rounded-full" />
        </div>
        <SidebarItem
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
                </svg>
            }
            label="Home"
            isActive={activeTab === 'home'}
            onClick={() => setActiveTab('home')}
        />
        <SidebarItem
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 014-4h4m0 0V7a4 4 0 00-4-4H7a4 4 0 00-4 4v10a4 4 0 004 4h6a4 4 0 004-4v-4z" />
                </svg>
            }
            label="Active Tasks"
            isActive={activeTab === 'activeTasks'}
            onClick={() => setActiveTab('activeTasks')}
        />
        <SidebarItem
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2m10-4h-4m0 0V4m0 0v4" />
                </svg>
            }
            label="Task Thread"
            isActive={activeTab === 'taskThread'}
            onClick={() => setActiveTab('taskThread')}
        />
    </div>
);

// --- Active Task Card ---
const TaskCard = ({ query, status }) => {
    const statusColor = {
        active: 'bg-green-500',
        halted: 'bg-yellow-500',
        userStopped: 'bg-red-500',
    }[status] || 'bg-gray-500';
    const statusLabel = {
        active: 'Active',
        halted: 'Halted',
        userStopped: 'User Stopped',
    }[status] || status;
    return (
        <div className="rounded-lg shadow-lg p-6 mb-4 bg-[#1D1F24]">
            <div className="flex items-center mb-2">
                <div className={`w-3 h-3 rounded-full mr-2 ${statusColor}`}></div>
                <span className="text-sm text-[#F9FAFB] font-semibold">{statusLabel}</span>
            </div>
            <div className="text-[#F9FAFB] text-base">{query}</div>
        </div>
    );
};

// --- Env Variables Editor ---
const EnvVarsSection = () => {
    const [vars, setVars] = useState({
        OPENAI_API_KEY: 'sk-xxxx',
        ANTHROPIC_KEY: 'sk-ant-xxxx',
    });
    const handleChange = (key, value) => setVars(v => ({ ...v, [key]: value }));
    return (
        <div className="bg-[#1D1F24] rounded-xl p-6 mt-6 max-w-xl">
            <h3 className="text-lg font-bold text-[#F9FAFB] mb-4">Environment Variables</h3>
            {Object.entries(vars).map(([key, value]) => (
                <div key={key} className="mb-3">
                    <label className="block text-[#9CA3AF] text-xs mb-1">{key}</label>
                    <input
                        className="w-full bg-[#252830] border border-[#2A2D35] rounded-md p-2 text-[#F9FAFB] text-sm"
                        value={value}
                        onChange={e => handleChange(key, e.target.value)}
                    />
                </div>
            ))}
            <button className="mt-4 px-4 py-2 rounded bg-[#6366F1] text-white font-semibold">Save</button>
        </div>
    );
};

// --- Task Thread Tab ---
const threads = [
    { id: 'thread1', name: 'Thread 1' },
    { id: 'thread2', name: 'Thread 2' },
];
const messages = {
    thread1: [
        { sender: 'user', text: 'What is the weather today?' },
        { sender: 'ai', text: 'The weather is sunny.' },
    ],
    thread2: [
        { sender: 'user', text: 'Remind me to call John.' },
        { sender: 'ai', text: 'Reminder set for John.' },
    ],
};
const TaskThreadTab = () => {
    const [selected, setSelected] = useState('thread1');
    return (
        <div className="p-8 w-full">
            <div className="mb-4">
                <label className="text-[#F9FAFB] font-semibold mr-2">Select Thread:</label>
                <select
                    className="bg-[#252830] text-[#F9FAFB] p-2 rounded"
                    value={selected}
                    onChange={e => setSelected(e.target.value)}
                >
                    {threads.map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                </select>
            </div>
            <div className="space-y-4">
                {messages[selected].map((msg, i) => (
                    <div key={i} className={`p-4 rounded-lg max-w-lg ${msg.sender === 'user' ? 'bg-[#6366F1] text-white ml-auto' : 'bg-[#1D1F24] text-[#F9FAFB] mr-auto'}`}>{msg.text}</div>
                ))}
            </div>
        </div>
    );
};

// --- MainContent ---
const MainContent = ({ activeTab }) => (
    <div className="flex-1 p-10 overflow-auto">
        {activeTab === 'home' && (
            <>
                <h1 className="text-3xl font-bold text-[#F9FAFB] mb-6">Got a task? Don’t worry, Donna got your back!!</h1>
                <EnvVarsSection />
            </>
        )}
        {activeTab === 'activeTasks' && (
            <div className="max-w-xl">
                <TaskCard query="Summarize this document for me." status="active" />
                <TaskCard query="Generate a Python script." status="halted" />
                <TaskCard query="Send an email to Alice." status="userStopped" />
            </div>
        )}
        {activeTab === 'taskThread' && <TaskThreadTab />}
    </div>
);

const MainPage = () => {
    const [activeTab, setActiveTab] = useState('home');
    return (
        <div className="flex h-screen" style={{ backgroundColor: '#121317' }}>
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <MainContent activeTab={activeTab} />
        </div>
    );
};

export default MainPage;
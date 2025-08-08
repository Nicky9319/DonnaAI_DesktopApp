import React from 'react';

const SidebarItem = ({ icon, label, isActive, onClick }) => (
    <div
        className={`flex items-center justify-center w-16 h-16 cursor-pointer transition-colors relative group ${
            isActive ? 'bg-[#3A86FF]/20' : ''
        }`}
        onClick={onClick}
        style={{ color: '#FFFFFF' }}
    >
        {icon}
        {/* Tooltip on hover */}
        <span 
            className="absolute left-20 top-1/2 -translate-y-1/2 px-3 py-1 rounded bg-[#0D1B2A] text-[#FFFFFF] text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap shadow-lg z-10 pointer-events-none transition-opacity border border-[#3A86FF]/30"
        >
            {label}
        </span>
    </div>
);

export default SidebarItem;

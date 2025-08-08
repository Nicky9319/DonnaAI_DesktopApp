import React from 'react';

const SidebarItem = ({ icon, label, isActive, onClick }) => (
    <div
        className={`relative flex items-center justify-center w-10 h-10 cursor-pointer transition-all duration-150 rounded-2xl group`}
        onClick={onClick}
        style={{
            backgroundColor: isActive ? '#007AFF' : 'transparent',
            color: isActive ? '#FFFFFF' : '#8E8E93'
        }}
        onMouseEnter={(e) => {
            if (!isActive) {
                e.target.style.backgroundColor = 'rgba(28, 28, 30, 0.6)';
                e.target.style.color = '#E5E5E7';
            }
        }}
        onMouseLeave={(e) => {
            if (!isActive) {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#8E8E93';
            }
        }}
    >
        {icon}
        
        {/* Tooltip on hover */}
        <div 
            className="absolute left-14 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none transition-all duration-150 transform translate-x-1 group-hover:translate-x-0"
            style={{
                backgroundColor: '#111111',
                color: '#E5E5E7',
                border: '1px solid #1C1C1E',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
            }}
        >
            {label}
            {/* Arrow pointing to sidebar item */}
            <div 
                className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0"
                style={{
                    borderTop: '4px solid transparent',
                    borderBottom: '4px solid transparent',
                    borderRight: '4px solid #111111'
                }}
            />
        </div>
    </div>
);

export default SidebarItem;

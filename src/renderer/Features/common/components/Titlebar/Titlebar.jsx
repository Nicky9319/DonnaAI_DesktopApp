import React from 'react';

const Titlebar = () => {
    const handleClose = () => {
        console.log('Close button clicked');
        if (window.electronAPI && window.electronAPI.closeApp) {
            console.log('Calling electronAPI.closeApp()');
            window.electronAPI.closeApp();
        } else {
            console.warn('Electron API not available. Cannot close app.');
            // Fallback for development
            if (window.close) {
                window.close();
            }
        }
    };

    return (
        <div
            className="w-full h-8 flex items-center justify-between px-3"
            style={{
                backgroundColor: '#000000',
                borderBottom: '1px solid #1C1C1E',
                WebkitAppRegion: 'drag', // Makes the entire bar draggable
                userSelect: 'none' // Prevents text selection
            }}
        >
            {/* Left side - Close Button Only */}
            <div className="flex items-center">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="w-3 h-3 rounded-full flex items-center justify-center transition-all duration-150 group"
                    style={{
                        backgroundColor: '#FF3B30', // Red color
                        WebkitAppRegion: 'no-drag' // Make button non-draggable
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#D70015'; // Darker red on hover
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#FF3B30'; // Original red
                    }}
                >
                    {/* X icon that appears on hover */}
                    <svg 
                        className="w-1.5 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150" 
                        style={{ color: '#FFFFFF' }} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                    >
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {/* Center - App Title */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
                <span 
                    className="text-xs font-medium"
                    style={{ color: '#8E8E93' }}
                >
                    Donna AI
                </span>
            </div>

            {/* Right side - Empty for balance */}
            <div className="w-20"></div>
        </div>
    );
};

export default Titlebar;
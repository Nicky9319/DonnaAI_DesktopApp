import React from 'react';

const Titlebar = () => {
    const handleClose = () => {
        // For Electron app, we'll need to communicate with the main process
        if (window.electronAPI) {
            window.electronAPI.closeApp();
        } else {
            // Fallback for web version
            window.close();
        }
    };

    return (
        <div 
            className="w-full h-8 flex items-center justify-between px-4 select-none"
            style={{ 
                backgroundColor: '#000000',
                borderBottom: '1px solid #1C1C1E',
                WebkitAppRegion: 'drag' // Makes the titlebar draggable
            }}
        >
            {/* Close Button */}
            <div className="flex items-center">
                <button
                    onClick={handleClose}
                    className="w-3 h-3 rounded-full transition-all duration-150 hover:scale-110"
                    style={{ 
                        backgroundColor: '#FF3B30',
                        WebkitAppRegion: 'no-drag' // Prevent dragging on button
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#D70015';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#FF3B30';
                    }}
                />
            </div>

            {/* Empty center space for dragging */}
            <div className="flex-1" />

            {/* Right side - empty for now */}
            <div className="flex items-center">
                {/* Add minimize/maximize buttons here if needed */}
            </div>
        </div>
    );
};

export default Titlebar;

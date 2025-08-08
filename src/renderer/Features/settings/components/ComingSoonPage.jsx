import React from 'react';

const ComingSoonPage = () => {
    return (
        <div className="min-h-full flex flex-col items-center justify-center px-6 py-8" style={{ backgroundColor: '#000000' }}>
            {/* Coming Soon Content */}
            <div className="text-center space-y-6 max-w-md">
                {/* Icon */}
                <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 122, 255, 0.1)' }}>
                    <svg className="w-10 h-10" style={{ color: '#007AFF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-light tracking-tight" style={{ color: '#FFFFFF' }}>
                    Settings
                </h1>

                {/* Coming Soon Message */}
                <div className="space-y-2">
                    <h2 className="text-xl font-medium" style={{ color: '#FFFFFF' }}>
                        Coming Soon
                    </h2>
                    <p className="text-base" style={{ color: '#8E8E93' }}>
                        We're working hard to bring you an amazing settings experience. 
                        This feature will be available in a future update.
                    </p>
                </div>

                {/* Loading Animation */}
                <div className="flex justify-center space-x-1">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#007AFF' }}></div>
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#007AFF', animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#007AFF', animationDelay: '0.2s' }}></div>
                </div>
            </div>
        </div>
    );
};

export default ComingSoonPage;

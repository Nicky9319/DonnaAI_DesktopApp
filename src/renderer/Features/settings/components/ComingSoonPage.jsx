import React from 'react';

const ComingSoonPage = () => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8" style={{ backgroundColor: '#000000', minHeight: '100vh' }}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 25px 25px, #007AFF 2px, transparent 0)`,
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            {/* Coming Soon Content */}
            <div className="relative z-10 text-center space-y-8 max-w-2xl">
                {/* Large Icon */}
                <div className="w-32 h-32 mx-auto rounded-3xl flex items-center justify-center transition-all duration-300 hover:scale-105" 
                     style={{ 
                         backgroundColor: 'rgba(0, 122, 255, 0.15)',
                         border: '2px solid rgba(0, 122, 255, 0.3)',
                         boxShadow: '0 8px 32px rgba(0, 122, 255, 0.2)'
                     }}>
                    <svg className="w-16 h-16" style={{ color: '#007AFF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>

                {/* Title */}
                <div className="space-y-4">
                    <h1 className="text-5xl font-light tracking-tight" style={{ color: '#FFFFFF' }}>
                        Settings
                    </h1>
                    <h2 className="text-3xl font-medium" style={{ color: '#007AFF' }}>
                        Coming Soon
                    </h2>
                </div>

                {/* Description */}
                <div className="space-y-4 max-w-lg mx-auto">
                    <p className="text-lg leading-relaxed" style={{ color: '#E5E5E7' }}>
                        We're crafting an amazing settings experience that will give you complete control over your Donna AI assistant.
                    </p>
                    <p className="text-base" style={{ color: '#8E8E93' }}>
                        Advanced customization options, API configurations, and preferences will be available in an upcoming update.
                    </p>
                </div>

                {/* Features Preview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    <div className="text-center space-y-3">
                        <div className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 208, 156, 0.15)' }}>
                            <svg className="w-6 h-6" style={{ color: '#00D09C' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                            </svg>
                        </div>
                        <h3 className="text-sm font-medium" style={{ color: '#FFFFFF' }}>Customization</h3>
                        <p className="text-xs" style={{ color: '#8E8E93' }}>Personalize your experience</p>
                    </div>
                    
                    <div className="text-center space-y-3">
                        <div className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 149, 0, 0.15)' }}>
                            <svg className="w-6 h-6" style={{ color: '#FF9500' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                            </svg>
                        </div>
                        <h3 className="text-sm font-medium" style={{ color: '#FFFFFF' }}>API Control</h3>
                        <p className="text-xs" style={{ color: '#8E8E93' }}>Manage your integrations</p>
                    </div>
                    
                    <div className="text-center space-y-3">
                        <div className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 59, 48, 0.15)' }}>
                            <svg className="w-6 h-6" style={{ color: '#FF3B30' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h3 className="text-sm font-medium" style={{ color: '#FFFFFF' }}>Privacy</h3>
                        <p className="text-xs" style={{ color: '#8E8E93' }}>Secure and private</p>
                    </div>
                </div>

                {/* Enhanced Loading Animation */}
                <div className="flex justify-center items-center space-x-2 mt-12">
                    <div className="flex space-x-1">
                        <div className="w-3 h-3 rounded-full animate-bounce" style={{ backgroundColor: '#007AFF', animationDelay: '0ms' }}></div>
                        <div className="w-3 h-3 rounded-full animate-bounce" style={{ backgroundColor: '#007AFF', animationDelay: '150ms' }}></div>
                        <div className="w-3 h-3 rounded-full animate-bounce" style={{ backgroundColor: '#007AFF', animationDelay: '300ms' }}></div>
                    </div>
                    <span className="ml-3 text-sm font-medium" style={{ color: '#8E8E93' }}>
                        Building something amazing...
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ComingSoonPage;

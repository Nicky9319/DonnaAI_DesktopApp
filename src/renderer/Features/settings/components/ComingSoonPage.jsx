import React, { useEffect, useState } from 'react';

const ComingSoonPage = () => {
    const [animationPhase, setAnimationPhase] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimationPhase(prev => (prev + 1) % 3);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 relative" style={{ backgroundColor: '#000000', minHeight: '100vh' }}>
            {/* Animated Background Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full animate-pulse"
                        style={{
                            backgroundColor: '#007AFF',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            {/* Coming Soon Content */}
            <div className="relative z-10 text-center space-y-12 max-w-xl">
                {/* Animated Icon */}
                <div className="relative">
                    <div 
                        className="w-24 h-24 mx-auto rounded-full flex items-center justify-center transition-all duration-1000" 
                        style={{ 
                            backgroundColor: animationPhase === 0 ? 'rgba(0, 122, 255, 0.2)' : 
                                           animationPhase === 1 ? 'rgba(0, 208, 156, 0.2)' : 'rgba(255, 149, 0, 0.2)',
                            boxShadow: `0 0 40px ${animationPhase === 0 ? 'rgba(0, 122, 255, 0.3)' : 
                                                  animationPhase === 1 ? 'rgba(0, 208, 156, 0.3)' : 'rgba(255, 149, 0, 0.3)'}`,
                            transform: `scale(${animationPhase === 1 ? 1.1 : 1})`,
                        }}>
                        <svg 
                            className="w-12 h-12 transition-all duration-1000" 
                            style={{ 
                                color: animationPhase === 0 ? '#007AFF' : 
                                       animationPhase === 1 ? '#00D09C' : '#FF9500',
                                transform: `rotate(${animationPhase * 120}deg)`
                            }} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    
                    {/* Orbiting Dots */}
                    <div className="absolute inset-0 animate-spin pointer-events-none" style={{ animationDuration: '4s' }}>
                        <div className="absolute w-2 h-2 rounded-full" style={{ 
                            backgroundColor: '#007AFF', 
                            top: '10%', 
                            left: '50%', 
                            transform: 'translateX(-50%)'
                        }}></div>
                        <div className="absolute w-2 h-2 rounded-full" style={{ 
                            backgroundColor: '#00D09C', 
                            bottom: '10%', 
                            left: '50%', 
                            transform: 'translateX(-50%)'
                        }}></div>
                        <div className="absolute w-2 h-2 rounded-full" style={{ 
                            backgroundColor: '#FF9500', 
                            top: '50%', 
                            right: '10%', 
                            transform: 'translateY(-50%)'
                        }}></div>
                    </div>
                </div>

                {/* Title with Typewriter Effect */}
                <div className="space-y-6">
                    <h1 className="text-4xl font-light tracking-tight animate-pulse" style={{ color: '#FFFFFF' }}>
                        Settings
                    </h1>
                    <h2 className="text-2xl font-medium" style={{ 
                        color: animationPhase === 0 ? '#007AFF' : 
                               animationPhase === 1 ? '#00D09C' : '#FF9500',
                        transition: 'color 1s ease'
                    }}>
                        Coming Soon
                    </h2>
                </div>

                {/* Simple Description */}
                <p className="text-base leading-relaxed max-w-md mx-auto" style={{ color: '#8E8E93' }}>
                    We're building something amazing. Stay tuned for powerful customization options.
                </p>

                {/* Animated Progress Dots */}
                <div className="flex justify-center items-center space-x-3">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <div 
                            key={i}
                            className="w-2 h-2 rounded-full transition-all duration-500"
                            style={{
                                backgroundColor: i <= animationPhase ? '#007AFF' : '#1C1C1E',
                                transform: i === animationPhase ? 'scale(1.5)' : 'scale(1)',
                                opacity: i <= animationPhase ? 1 : 0.3
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ComingSoonPage;

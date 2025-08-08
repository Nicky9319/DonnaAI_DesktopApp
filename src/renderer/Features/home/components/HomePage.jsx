import React, { useState } from 'react';

const HomePage = () => {
    const [apiKeys, setApiKeys] = useState({
        OPENAI_API_KEY: '',
        ANTHROPIC_API_KEY: '',
        GOOGLE_API_KEY: '',
    });

    const [quickAction, setQuickAction] = useState('');

    const handleApiKeyChange = (key, value) => {
        setApiKeys(prev => ({ ...prev, [key]: value }));
    };

    const handleQuickAction = () => {
        if (quickAction.trim()) {
            console.log('Quick action:', quickAction);
            // TODO: Handle quick action
            setQuickAction('');
        }
    };

    return (
        <div className="min-h-full flex flex-col items-center justify-center px-6 py-8" style={{ backgroundColor: '#000000' }}>
            {/* Main Content Container */}
            <div className="w-full max-w-3xl mx-auto space-y-12">
                
                {/* Hero Section */}
                <div className="text-center space-y-4">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-light tracking-tight" style={{ color: '#FFFFFF' }}>
                            Meet{' '}
                            <span className="font-medium" style={{ color: '#00D09C' }}>
                                Donna
                            </span>
                        </h1>
                        <p className="text-lg font-light" style={{ color: '#E5E5E7' }}>
                            Your intelligent assistant for any task
                        </p>
                    </div>
                </div>

                {/* Quick Action Section */}
                <div className="max-w-xl mx-auto">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="What can I help you with today?"
                            value={quickAction}
                            onChange={(e) => setQuickAction(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleQuickAction()}
                            className="w-full px-5 py-3.5 text-base rounded-xl border transition-all duration-200 focus:outline-none placeholder-opacity-60"
                            style={{
                                backgroundColor: '#111111',
                                borderColor: '#1C1C1E',
                                color: '#FFFFFF',
                                borderWidth: '1px',
                                fontSize: '16px'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#007AFF';
                                e.target.style.boxShadow = '0 0 0 3px rgba(0, 122, 255, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#1C1C1E';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                        <button
                            onClick={handleQuickAction}
                            className="absolute right-1.5 top-1/2 transform -translate-y-1/2 px-4 py-2 rounded-lg font-medium transition-all duration-150"
                            style={{
                                backgroundColor: '#007AFF',
                                color: '#FFFFFF',
                                fontSize: '14px'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#0056CC';
                                e.target.style.transform = 'translateY(-50%) scale(0.98)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#007AFF';
                                e.target.style.transform = 'translateY(-50%) scale(1)';
                            }}
                        >
                            Ask
                        </button>
                    </div>
                </div>

                {/* API Configuration Section */}
                <div className="max-w-xl mx-auto">
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-light mb-1" style={{ color: '#FFFFFF' }}>
                            API Configuration
                        </h2>
                        <p className="text-sm" style={{ color: '#8E8E93' }}>
                            Configure your API keys to get started
                        </p>
                    </div>

                    <div className="space-y-3">
                        {Object.entries(apiKeys).map(([key, value]) => (
                            <div key={key} className="space-y-1.5">
                                <label className="block text-sm font-medium" style={{ color: '#E5E5E7' }}>
                                    {key.replace('_', ' ')}
                                </label>
                                <input
                                    type="password"
                                    value={value}
                                    onChange={(e) => handleApiKeyChange(key, e.target.value)}
                                    placeholder={`Enter your ${key.replace('_', ' ').toLowerCase()}...`}
                                    className="w-full px-4 py-3 rounded-xl border transition-all duration-150 focus:outline-none text-sm"
                                    style={{
                                        backgroundColor: '#111111',
                                        borderColor: '#1C1C1E',
                                        color: '#FFFFFF',
                                        borderWidth: '1px',
                                        fontSize: '15px'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#007AFF';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(0, 122, 255, 0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#1C1C1E';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 text-center">
                        <button
                            className="px-6 py-2.5 rounded-xl font-medium transition-all duration-150 text-sm"
                            style={{
                                backgroundColor: '#007AFF',
                                color: '#FFFFFF',
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#0056CC';
                                e.target.style.transform = 'scale(0.98)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#007AFF';
                                e.target.style.transform = 'scale(1)';
                            }}
                        >
                            Save Configuration
                        </button>
                    </div>
                </div>

                {/* Feature Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                    <div className="text-center space-y-2">
                        <div className="w-10 h-10 mx-auto rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 122, 255, 0.1)' }}>
                            <svg className="w-5 h-5" style={{ color: '#007AFF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-base font-medium" style={{ color: '#FFFFFF' }}>Fast & Efficient</h3>
                        <p className="text-sm" style={{ color: '#8E8E93' }}>Get instant responses and quick task completion</p>
                    </div>
                    
                    <div className="text-center space-y-2">
                        <div className="w-10 h-10 mx-auto rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 208, 156, 0.1)' }}>
                            <svg className="w-5 h-5" style={{ color: '#00D09C' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-base font-medium" style={{ color: '#FFFFFF' }}>Reliable</h3>
                        <p className="text-sm" style={{ color: '#8E8E93' }}>Consistent performance you can depend on</p>
                    </div>
                    
                    <div className="text-center space-y-2">
                        <div className="w-10 h-10 mx-auto rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 149, 0, 0.1)' }}>
                            <svg className="w-5 h-5" style={{ color: '#FF9500' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <h3 className="text-base font-medium" style={{ color: '#FFFFFF' }}>Intuitive</h3>
                        <p className="text-sm" style={{ color: '#8E8E93' }}>Easy to use with natural conversation</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;

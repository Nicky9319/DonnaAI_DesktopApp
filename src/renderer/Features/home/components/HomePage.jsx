import React, { useState } from 'react';

const HomePage = () => {
    const [apiKeys, setApiKeys] = useState({
        OPENAI_API_KEY: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        ANTHROPIC_API_KEY: 'sk-ant-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        GOOGLE_API_KEY: 'AIza-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    });

    const [quickAction, setQuickAction] = useState('');
    const [editingKey, setEditingKey] = useState(null);
    const [showPasswords, setShowPasswords] = useState({});

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

    const togglePasswordVisibility = (key) => {
        setShowPasswords(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const startEditing = (key) => {
        setEditingKey(key);
    };

    const saveEdit = (key) => {
        setEditingKey(null);
        // TODO: Save the edited value
    };

    const cancelEdit = () => {
        setEditingKey(null);
    };

    return (
        <div className="min-h-full flex flex-col items-center px-6 py-6" style={{ backgroundColor: '#000000' }}>
            {/* Header Section */}
            <div className="text-center mb-8 w-full max-w-2xl">
                <h1 className="text-5xl font-light tracking-tight mb-3" style={{ color: '#FFFFFF' }}>
                    Meet{' '}
                    <span className="font-medium" style={{ color: '#00D09C' }}>
                        Donna
                    </span>
                </h1>
                <p className="text-lg font-light" style={{ color: '#8E8E93' }}>
                    Your intelligent assistant for any task
                </p>
            </div>

            {/* Separator Line */}
            <div className="w-full max-w-2xl mb-8">
                <div className="h-px" style={{ backgroundColor: '#1C1C1E' }}></div>
            </div>

            {/* Main Content Container */}
            <div className="w-full max-w-2xl space-y-8 flex flex-col items-center">
                
                {/* Quick Action Section */}
                <div className="w-full max-w-lg">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="What can I help you with today?"
                            value={quickAction}
                            onChange={(e) => setQuickAction(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleQuickAction()}
                            className="w-full px-4 py-3 text-sm rounded-xl border transition-all duration-150 focus:outline-none"
                            style={{
                                backgroundColor: '#111111',
                                borderColor: '#1C1C1E',
                                color: '#E5E5E7',
                                borderWidth: '1px'
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
                            className="absolute right-1.5 top-1/2 transform -translate-y-1/2 px-3 py-1.5 rounded-lg font-medium transition-all duration-150 text-xs"
                            style={{
                                backgroundColor: '#007AFF',
                                color: '#FFFFFF'
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
                <div className="w-full max-w-lg">
                    <div className="text-center mb-4">
                        <h2 className="text-lg font-light mb-1" style={{ color: '#FFFFFF' }}>
                            API Configuration
                        </h2>
                        <p className="text-xs" style={{ color: '#8E8E93' }}>
                            Configure your API keys to get started
                        </p>
                    </div>

                    <div className="space-y-3">
                        {Object.entries(apiKeys).map(([key, value]) => (
                            <div key={key} className="space-y-1.5">
                                <label className="block text-xs font-medium" style={{ color: '#E5E5E7' }}>
                                    {key.replace('_', ' ')}
                                </label>
                                <div className="relative">
                                    {editingKey === key ? (
                                        <div className="flex space-x-2">
                                            <input
                                                type={showPasswords[key] ? "text" : "password"}
                                                value={value}
                                                onChange={(e) => handleApiKeyChange(key, e.target.value)}
                                                className="flex-1 px-3 py-2.5 rounded-xl border transition-all duration-150 focus:outline-none text-xs"
                                                style={{
                                                    backgroundColor: '#111111',
                                                    borderColor: '#007AFF',
                                                    color: '#E5E5E7',
                                                    borderWidth: '1px'
                                                }}
                                                onFocus={(e) => {
                                                    e.target.style.boxShadow = '0 0 0 3px rgba(0, 122, 255, 0.1)';
                                                }}
                                                onBlur={(e) => {
                                                    e.target.style.boxShadow = 'none';
                                                }}
                                            />
                                            <button
                                                onClick={() => togglePasswordVisibility(key)}
                                                className="px-2 py-2.5 rounded-lg transition-all duration-150"
                                                style={{
                                                    backgroundColor: '#111111',
                                                    borderColor: '#1C1C1E',
                                                    borderWidth: '1px'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.backgroundColor = '#1C1C1E';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.backgroundColor = '#111111';
                                                }}
                                            >
                                                <svg className="w-4 h-4" style={{ color: '#8E8E93' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    {showPasswords[key] ? (
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                                    ) : (
                                                        <>
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </>
                                                    )}
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => saveEdit(key)}
                                                className="px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150"
                                                style={{
                                                    backgroundColor: '#00D09C',
                                                    color: '#FFFFFF'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.backgroundColor = '#00B386';
                                                    e.target.style.transform = 'scale(0.98)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.backgroundColor = '#00D09C';
                                                    e.target.style.transform = 'scale(1)';
                                                }}
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={cancelEdit}
                                                className="px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150"
                                                style={{
                                                    backgroundColor: '#111111',
                                                    borderColor: '#1C1C1E',
                                                    color: '#8E8E93',
                                                    borderWidth: '1px'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.backgroundColor = '#1C1C1E';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.backgroundColor = '#111111';
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center space-x-2">
                                            <div className="flex-1 px-3 py-2.5 rounded-xl border text-xs font-mono" style={{
                                                backgroundColor: '#111111',
                                                borderColor: '#1C1C1E',
                                                color: '#8E8E93',
                                                borderWidth: '1px'
                                            }}>
                                                {showPasswords[key] ? value : '••••••••••••••••••••••••••••••••••••••••'}
                                            </div>
                                            <button
                                                onClick={() => togglePasswordVisibility(key)}
                                                className="px-2 py-2.5 rounded-lg transition-all duration-150"
                                                style={{
                                                    backgroundColor: '#111111',
                                                    borderColor: '#1C1C1E',
                                                    borderWidth: '1px'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.backgroundColor = '#1C1C1E';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.backgroundColor = '#111111';
                                                }}
                                            >
                                                <svg className="w-4 h-4" style={{ color: '#8E8E93' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    {showPasswords[key] ? (
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                                    ) : (
                                                        <>
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </>
                                                    )}
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => startEditing(key)}
                                                className="px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150"
                                                style={{
                                                    backgroundColor: '#007AFF',
                                                    color: '#FFFFFF'
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
                                                Edit
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Feature Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-lg">
                    <div className="text-center space-y-1.5">
                        <div className="w-8 h-8 mx-auto rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 122, 255, 0.1)' }}>
                            <svg className="w-4 h-4" style={{ color: '#007AFF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-sm font-medium" style={{ color: '#FFFFFF' }}>Fast & Efficient</h3>
                        <p className="text-xs" style={{ color: '#8E8E93' }}>Get instant responses and quick task completion</p>
                    </div>
                    
                    <div className="text-center space-y-1.5">
                        <div className="w-8 h-8 mx-auto rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 208, 156, 0.1)' }}>
                            <svg className="w-4 h-4" style={{ color: '#00D09C' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-sm font-medium" style={{ color: '#FFFFFF' }}>Reliable</h3>
                        <p className="text-xs" style={{ color: '#8E8E93' }}>Consistent performance you can depend on</p>
                    </div>
                    
                    <div className="text-center space-y-1.5">
                        <div className="w-8 h-8 mx-auto rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 149, 0, 0.1)' }}>
                            <svg className="w-4 h-4" style={{ color: '#FF9500' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <h3 className="text-sm font-medium" style={{ color: '#FFFFFF' }}>Intuitive</h3>
                        <p className="text-xs" style={{ color: '#8E8E93' }}>Easy to use with natural conversation</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;

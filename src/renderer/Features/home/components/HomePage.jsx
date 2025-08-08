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
                {/* Environment Variables Section */}
                <div className="w-full max-w-5xl">
                    <div className="text-center mb-4">
                        <h2 className="text-xl font-light mb-1" style={{ color: '#FFFFFF' }}>
                            Environment Variables
                        </h2>
                        <p className="text-sm" style={{ color: '#8E8E93' }}>
                            Configure your environment variables to get started
                        </p>
                    </div>
                    <div className="space-y-3">
                        {Object.entries(apiKeys).map(([key, value]) => (
                            <div key={key} className="space-y-1.5">
                                <label className="block text-xs font-medium" style={{ color: '#E5E5E7' }}>
                                    {key.replace('_', ' ')}
                                </label>
                                <div className="flex flex-row items-center gap-x-6 w-full">
                                    {editingKey === key ? (
                                        <>
                                            <input
                                                type={showPasswords[key] ? "text" : "password"}
                                                value={value}
                                                onChange={(e) => handleApiKeyChange(key, e.target.value)}
                                                className="flex-1 px-4 py-3 rounded-xl border transition-all duration-150 focus:outline-none text-sm"
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
                                                className="px-3 py-3 rounded-lg transition-all duration-150"
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
                                                <svg className="w-5 h-5" style={{ color: '#8E8E93' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                                className="px-5 py-3 rounded-lg text-sm font-medium transition-all duration-150"
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
                                                className="px-5 py-3 rounded-lg text-sm font-medium transition-all duration-150"
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
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex-1 px-4 py-3 rounded-xl border text-sm font-mono" style={{
                                                backgroundColor: '#111111',
                                                borderColor: '#1C1C1E',
                                                color: '#8E8E93',
                                                borderWidth: '1px'
                                            }}>
                                                {showPasswords[key] ? value : '••••••••••••••••••••••••••••••••••••••••'}
                                            </div>
                                            <button
                                                onClick={() => togglePasswordVisibility(key)}
                                                className="px-3 py-3 rounded-lg transition-all duration-150"
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
                                                <svg className="w-5 h-5" style={{ color: '#8E8E93' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                                className="px-5 py-3 rounded-lg text-sm font-medium transition-all duration-150"
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
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;

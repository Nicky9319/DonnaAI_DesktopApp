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
    const [newVar, setNewVar] = useState({ key: '', value: '' });

    // show inline add form when plus is clicked
    const [showAddForm, setShowAddForm] = useState(false);

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

    const handleAddVariable = () => {
        const raw = newVar.key.trim();
        if (!raw) return;
        // normalize variable name to use underscores instead of spaces
        const normalized = raw.replace(/\s+/g, '_');
        if (apiKeys.hasOwnProperty(normalized)) return;
        setApiKeys(prev => ({ ...prev, [normalized]: newVar.value }));
        setNewVar({ key: '', value: '' });
        setShowAddForm(false);
    };

    const cancelAdd = () => {
        setNewVar({ key: '', value: '' });
        setShowAddForm(false);
    };

    const handleDeleteVariable = (key) => {
        setApiKeys(prev => {
            const updated = { ...prev };
            delete updated[key];
            return updated;
        });
        setShowPasswords(prev => {
            const updated = { ...prev };
            delete updated[key];
            return updated;
        });
        if (editingKey === key) setEditingKey(null);
    };

    return (
        <div className="min-h-full flex flex-col px-8 py-8" style={{ backgroundColor: '#000000' }}>
            {/* Header Section - macOS style with subtle spacing */}
            <div className="text-center mb-12">
                <h1 className="text-6xl font-extralight tracking-tight mb-4" style={{ color: '#FFFFFF' }}>
                    Meet{' '}
                    <span className="font-light" style={{ color: '#00D09C' }}>
                        Donna
                    </span>
                </h1>
                <p className="text-lg font-light opacity-70" style={{ color: '#FFFFFF' }}>
                    Your intelligent assistant for any task
                </p>
            </div>

            {/* Main Content - Centered card container */}
            <div className="flex justify-center">
                <div 
                    className="w-full max-w-3xl rounded-2xl p-8 shadow-2xl"
                    style={{ 
                        backgroundColor: '#0A0A0A',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)'
                    }}
                >
                    {/* Section Title */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-light mb-2" style={{ color: '#FFFFFF' }}>
                            Environment Variables
                        </h2>
                        <p className="text-sm opacity-60" style={{ color: '#FFFFFF' }}>
                            Configure your API keys and environment variables
                        </p>
                    </div>

                    {/* Variables List */}
                    <div className="space-y-4">
                        {Object.entries(apiKeys).map(([key, value]) => (
                            <div 
                                key={key} 
                                className="rounded-xl p-5 transition-all duration-200"
                                style={{ 
                                    backgroundColor: '#111111',
                                    border: '1px solid rgba(255,255,255,0.06)'
                                }}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <label className="text-sm font-medium" style={{ color: '#E5E5E7' }}>
                                        {key.replace(/_/g, ' ')}
                                    </label>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => togglePasswordVisibility(key)}
                                            className="p-2 rounded-lg transition-colors"
                                            style={{
                                                backgroundColor: 'transparent',
                                                color: '#8E8E93'
                                            }}
                                            onMouseEnter={(e) => e.target.style.backgroundColor = '#1C1C1E'}
                                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                {showPasswords[key] ? (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                                ) : (
                                                    <>
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </>
                                                )}
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                
                                {editingKey === key ? (
                                    <div className="space-y-3">
                                        <input
                                            type={showPasswords[key] ? "text" : "password"}
                                            value={value}
                                            onChange={(e) => handleApiKeyChange(key, e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg text-sm font-mono transition-all focus:outline-none"
                                            style={{
                                                backgroundColor: '#1A1A1A',
                                                border: '2px solid #007AFF',
                                                color: '#FFFFFF'
                                            }}
                                        />
                                        <div className="flex justify-end space-x-3">
                                            <button
                                                onClick={cancelEdit}
                                                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                                style={{
                                                    backgroundColor: 'transparent',
                                                    color: '#8E8E93',
                                                    border: '1px solid rgba(255,255,255,0.1)'
                                                }}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => handleDeleteVariable(key)}
                                                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                                style={{
                                                    backgroundColor: '#FF3B30',
                                                    color: '#FFFFFF'
                                                }}
                                            >
                                                Delete
                                            </button>
                                            <button
                                                onClick={() => saveEdit(key)}
                                                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                                style={{
                                                    backgroundColor: '#00D09C',
                                                    color: '#000000'
                                                }}
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <div 
                                            className="w-full px-4 py-3 rounded-lg text-sm font-mono"
                                            style={{
                                                backgroundColor: '#1A1A1A',
                                                color: '#8E8E93',
                                                border: '1px solid rgba(255,255,255,0.05)'
                                            }}
                                        >
                                            {showPasswords[key] ? value : '•'.repeat(40)}
                                        </div>
                                        <div className="flex justify-end space-x-3">
                                            <button
                                                onClick={() => handleDeleteVariable(key)}
                                                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                                style={{
                                                    backgroundColor: 'rgba(255,59,48,0.1)',
                                                    color: '#FF3B30',
                                                    border: '1px solid rgba(255,59,48,0.2)'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.backgroundColor = '#FF3B30';
                                                    e.target.style.color = '#FFFFFF';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.backgroundColor = 'rgba(255,59,48,0.1)';
                                                    e.target.style.color = '#FF3B30';
                                                }}
                                            >
                                                Delete
                                            </button>
                                            <button
                                                onClick={() => startEditing(key)}
                                                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                                style={{
                                                    backgroundColor: '#007AFF',
                                                    color: '#FFFFFF'
                                                }}
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Add Variable Form */}
                        {showAddForm && (
                            <div 
                                className="rounded-xl p-5 transition-all duration-200"
                                style={{ 
                                    backgroundColor: '#111111',
                                    border: '2px solid #00D09C'
                                }}
                            >
                                <div className="mb-3">
                                    <label className="text-sm font-medium" style={{ color: '#00D09C' }}>
                                        New Variable
                                    </label>
                                </div>
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        placeholder="Variable name (e.g., MY_API_KEY)"
                                        value={newVar.key}
                                        onChange={e => setNewVar(v => ({ ...v, key: e.target.value }))}
                                        className="w-full px-4 py-3 rounded-lg text-sm transition-all focus:outline-none"
                                        style={{
                                            backgroundColor: '#1A1A1A',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            color: '#FFFFFF'
                                        }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Variable value"
                                        value={newVar.value}
                                        onChange={e => setNewVar(v => ({ ...v, value: e.target.value }))}
                                        className="w-full px-4 py-3 rounded-lg text-sm transition-all focus:outline-none"
                                        style={{
                                            backgroundColor: '#1A1A1A',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            color: '#FFFFFF'
                                        }}
                                    />
                                    <div className="flex justify-end space-x-3 pt-2">
                                        <button
                                            onClick={cancelAdd}
                                            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                            style={{
                                                backgroundColor: 'transparent',
                                                color: '#8E8E93',
                                                border: '1px solid rgba(255,255,255,0.1)'
                                            }}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleAddVariable}
                                            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                            style={{
                                                backgroundColor: '#00D09C',
                                                color: '#000000'
                                            }}
                                            disabled={!newVar.key.trim() || apiKeys.hasOwnProperty(newVar.key.trim().replace(/\s+/g,'_'))}
                                        >
                                            Add Variable
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Add Button */}
                        {!showAddForm && (
                            <div className="flex justify-center pt-4">
                                <button
                                    onClick={() => setShowAddForm(true)}
                                    className="flex items-center px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                                    style={{
                                        backgroundColor: 'rgba(0,208,156,0.1)',
                                        color: '#00D09C',
                                        border: '1px dashed rgba(0,208,156,0.3)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = 'rgba(0,208,156,0.15)';
                                        e.target.style.borderColor = 'rgba(0,208,156,0.5)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = 'rgba(0,208,156,0.1)';
                                        e.target.style.borderColor = 'rgba(0,208,156,0.3)';
                                    }}
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add Variable
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;

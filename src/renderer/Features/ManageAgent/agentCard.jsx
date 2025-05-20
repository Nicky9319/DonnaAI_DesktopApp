import React, { useState } from 'react';

const AgentCard = ({ agent, onDelete, onToggleStatus, onUpdateEnvVariable }) => {
    const [showConfig, setShowConfig] = useState(false);
    const [envVariables, setEnvVariables] = useState(agent.envVariables || {});
    
    // Status rendering logic
    const getStatusStyles = () => {
        switch(agent.status) {
            case 'Running':
                return {
                    bgColor: '#22C55E',
                    text: 'Running',
                    dotClass: 'animate-pulse'
                };
            case 'Loading':
                return {
                    bgColor: '#FBBF24',
                    text: 'Loading...',
                    dotClass: 'animate-ping'
                };
            default: // Stopped
                return {
                    bgColor: '#F87171',
                    text: 'Stopped',
                    dotClass: ''
                };
        }
    };
    
    const statusStyles = getStatusStyles();
    
    // Handle env variable changes
    const handleEnvChange = (key, value) => {
        const updatedVars = { ...envVariables, [key]: value };
        setEnvVariables(updatedVars);
        onUpdateEnvVariable(agent.id, key, value);
    };
    
    return (
        <div
            className="rounded-lg shadow-lg overflow-hidden transition-all duration-300"
            style={{ backgroundColor: '#1D1F24' }}
        >
            {/* Card Header */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-semibold" style={{ color: '#F9FAFB' }}>{agent.name}</h3>
                        <p style={{ color: '#9CA3AF' }} className="text-sm mt-1">Type: {agent.type}</p>
                    </div>
                    <div className="flex items-center px-3 py-1 rounded-full" 
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                        <div className={`h-2 w-2 rounded-full mr-2 ${statusStyles.dotClass}`} 
                            style={{ backgroundColor: statusStyles.bgColor }}></div>
                        <span className="text-xs font-medium" style={{ color: '#F9FAFB' }}>
                            {statusStyles.text}
                        </span>
                    </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-3 mt-6">
                    <button 
                        className="px-3 py-2 rounded-md text-sm font-medium flex-1 transition-colors flex justify-center items-center"
                        style={{ 
                            backgroundColor: agent.status === 'Running' ? '#F87171' : '#22C55E', 
                            color: '#F9FAFB',
                            opacity: agent.status === 'Loading' ? 0.7 : 1,
                            cursor: agent.status === 'Loading' ? 'not-allowed' : 'pointer'
                        }}
                        onClick={() => agent.status !== 'Loading' && onToggleStatus(agent.id)}
                        disabled={agent.status === 'Loading'}
                    >
                        {agent.status === 'Loading' ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing
                            </>
                        ) : agent.status === 'Running' ? 'Stop' : 'Start'}
                    </button>
                    <button
                        className="px-3 py-2 rounded-md text-sm font-medium flex-1 transition-colors"
                        style={{ 
                            backgroundColor: showConfig ? '#6366F1' : '#0EA5E9', 
                            color: '#F9FAFB' 
                        }}
                        onClick={() => setShowConfig(!showConfig)}
                    >
                        {showConfig ? 'Hide Config' : 'Configure'}
                    </button>
                    <button
                        className="px-3 py-2 rounded-md text-sm font-medium transition-colors"
                        style={{ backgroundColor: '#252830', color: '#9CA3AF', border: '1px solid #2A2D35' }}
                        onClick={() => onDelete(agent.id)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
            
            {/* Configuration Panel (Dropdown) */}
            {showConfig && (
                <div className="px-6 py-4 border-t transition-all duration-300"
                    style={{ borderColor: '#2A2D35', backgroundColor: '#252830' }}>
                    <h4 className="text-sm font-medium mb-3" style={{ color: '#F9FAFB' }}>Environment Variables</h4>
                    <div className="space-y-3">
                        {Object.entries(envVariables).map(([key, value]) => (
                            <div key={key} className="flex flex-col">
                                <label className="text-xs mb-1" style={{ color: '#9CA3AF' }}>{key}</label>
                                <input
                                    type="text"
                                    value={value}
                                    onChange={(e) => handleEnvChange(key, e.target.value)}
                                    className="bg-transparent border rounded-md px-3 py-2 text-sm"
                                    style={{ borderColor: '#2A2D35', color: '#F9FAFB' }}
                                    placeholder={`Enter ${key}...`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AgentCard;

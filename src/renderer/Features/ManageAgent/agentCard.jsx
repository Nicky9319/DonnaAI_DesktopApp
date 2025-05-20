import React from 'react';

const AgentCard = ({ agent, onDelete }) => {
    return (
        <div
            className="rounded-lg shadow-lg p-6 transition-transform hover:scale-105"
            style={{ backgroundColor: '#1D1F24' }}
        >
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold" style={{ color: '#F9FAFB' }}>{agent.name}</h3>
                <span
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{
                        backgroundColor: agent.status === 'Active' ? '#22C55E' : '#F87171',
                        color: '#F9FAFB',
                        opacity: 0.9
                    }}
                >
                    {agent.status}
                </span>
            </div>
            <p style={{ color: '#9CA3AF' }} className="mb-4">Type: {agent.type}</p>
            <div className="flex space-x-2 mt-4">
                <button
                    className="px-3 py-1 rounded text-sm font-medium flex-1 transition-colors"
                    style={{ backgroundColor: '#0EA5E9', color: '#F9FAFB' }}
                >
                    Configure
                </button>
                <button
                    className="px-3 py-1 rounded text-sm font-medium flex-1 transition-colors"
                    style={{ backgroundColor: '#252830', color: '#9CA3AF', border: '1px solid #2A2D35' }}
                    onClick={() => onDelete(agent.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default AgentCard;

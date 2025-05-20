import React, { useState } from 'react';
import AgentCard from './agentCard'; // Import the new AgentCard component

const ManageAgents = () => {
    // Dummy data for agents
    const [agents, setAgents] = useState([
        { id: 1, name: 'Agent Alpha', status: 'Active', type: 'Assistant' },
        { id: 2, name: 'Agent Beta', status: 'Inactive', type: 'Researcher' },
        { id: 3, name: 'Agent Gamma', status: 'Active', type: 'Analyzer' },
    ]);

    // Function to handle adding a new agent (placeholder)
    const handleAddAgent = () => {
        alert('Add agent functionality will be implemented here');
    };

    // Function to handle agent deletion (placeholder)
    const handleDeleteAgent = (id) => {
        setAgents(agents.filter(agent => agent.id !== id));
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold" style={{ color: '#F9FAFB' }}>Manage Agents</h2>
                <button 
                    className="px-4 py-2 rounded-md font-medium transition-colors"
                    style={{ backgroundColor: '#6366F1', color: '#F9FAFB' }}
                    onClick={handleAddAgent}
                >
                    Add New Agent
                </button>
            </div>
            
            {/* Agent Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.map(agent => (
                    <AgentCard 
                        key={agent.id} 
                        agent={agent} 
                        onDelete={handleDeleteAgent} 
                    />
                ))}
            </div>
            
            {/* No agents message */}
            {agents.length === 0 && (
                <div 
                    className="rounded-lg p-8 text-center mt-6"
                    style={{ backgroundColor: '#1D1F24', color: '#9CA3AF' }}
                >
                    <p className="text-lg">No agents found. Create your first agent to get started.</p>
                </div>
            )}
        </div>
    );
};

export default ManageAgents;

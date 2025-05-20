import React, { useState, useEffect } from 'react';
import AgentCard from './agentCard';

const ManageAgents = () => {
    // Updated dummy data for agents with the new status values including Loading possibility
    const [agents, setAgents] = useState([
        { 
            id: 1, 
            name: 'Agent Alpha', 
            status: 'Running', 
            type: 'Assistant',
            envVariables: {
                API_KEY: 'your-api-key',
                MODEL: 'gpt-4'
            }
        },
        { 
            id: 2, 
            name: 'Agent Beta', 
            status: 'Stopped', 
            type: 'Researcher',
            envVariables: {
                API_KEY: '',
                DATABASE_URL: 'mongodb://localhost:27017'
            }
        },
        { 
            id: 3, 
            name: 'Agent Gamma', 
            status: 'Running', 
            type: 'Analyzer',
            envVariables: {
                OPENAI_API_KEY: 'your-openai-key',
                PINECONE_API_KEY: 'your-pinecone-key'
            }
        },
    ]);

    // Keep track of pending deletions
    const [pendingDeletions, setPendingDeletions] = useState([]);

    // Clean up completed deletions
    useEffect(() => {
        if (pendingDeletions.length > 0) {
            const timer = setTimeout(() => {
                // Filter out agents that were marked for deletion
                setAgents(agents.filter(agent => !pendingDeletions.includes(agent.id)));
                setPendingDeletions([]);
            }, 2000); // 2 second delay for deletion
            
            return () => clearTimeout(timer);
        }
    }, [pendingDeletions, agents]);

    // Function to handle adding a new agent (placeholder)
    const handleAddAgent = () => {
        alert('Add agent functionality will be implemented here');
    };

    // Function to handle agent deletion with loading state
    const handleDeleteAgent = (id) => {
        // Mark the agent as being deleted (UI indication)
        setAgents(agents.map(agent => 
            agent.id === id 
                ? { ...agent, status: 'Deleting' } 
                : agent
        ));
        
        // Add to pending deletions
        setPendingDeletions([...pendingDeletions, id]);
    };

    // Function to toggle agent status with loading state
    const handleToggleStatus = (id) => {
        const targetAgent = agents.find(agent => agent.id === id);
        const targetStatus = targetAgent.status;
        
        // First set to Loading state
        setAgents(agents.map(agent => 
            agent.id === id 
                ? { ...agent, status: 'Loading' } 
                : agent
        ));

        // Simulate backend processing time
        setTimeout(() => {
            setAgents(agents.map(agent => 
                agent.id === id 
                    ? { ...agent, status: targetStatus === 'Running' ? 'Stopped' : 'Running' } 
                    : agent
            ));
        }, 2000); // Simulate 2 second delay for starting/stopping
    };

    // Function to update environment variables
    const handleUpdateEnvVariable = (id, key, value) => {
        setAgents(agents.map(agent => {
            if (agent.id === id) {
                return {
                    ...agent,
                    envVariables: {
                        ...agent.envVariables,
                        [key]: value
                    }
                };
            }
            return agent;
        }));
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold" style={{ color: '#F9FAFB' }}>Manage Agents</h2>
                <button 
                    className="px-4 py-2 rounded-md font-medium transition-colors flex items-center"
                    style={{ backgroundColor: '#6366F1', color: '#F9FAFB' }}
                    onClick={handleAddAgent}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
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
                        onToggleStatus={handleToggleStatus}
                        onUpdateEnvVariable={handleUpdateEnvVariable}
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
                    <button 
                        className="mt-4 px-4 py-2 rounded-md font-medium transition-colors"
                        style={{ backgroundColor: '#6366F1', color: '#F9FAFB' }}
                        onClick={handleAddAgent}
                    >
                        Create Your First Agent
                    </button>
                </div>
            )}
        </div>
    );
};

export default ManageAgents;

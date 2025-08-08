import React from 'react';
import TaskCard from './TaskCard';

const ActiveTasksPage = () => {
    const tasks = [
        {
            id: 1,
            query: "Summarize the quarterly report and extract key insights for the executive presentation.",
            status: "active"
        },
        {
            id: 2,
            query: "Generate a Python script to automate the data processing pipeline for customer analytics.",
            status: "halted"
        },
        {
            id: 3,
            query: "Send follow-up emails to all clients who haven't responded to our latest proposal.",
            status: "userStopped"
        },
        {
            id: 4,
            query: "Research and compile a list of potential investors for our Series A funding round.",
            status: "active"
        },
        {
            id: 5,
            query: "Create a comprehensive marketing strategy for the new product launch next month.",
            status: "halted"
        }
    ];

    const handleTaskAction = (taskId, action) => {
        console.log(`Task ${taskId} action: ${action}`);
        // TODO: Implement task action logic
    };

    return (
        <div className="min-h-full p-6 space-y-6" style={{ backgroundColor: '#000000' }}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 
                        className="text-3xl font-light tracking-tight"
                        style={{ color: '#FFFFFF' }}
                    >
                        Active Tasks
                    </h1>
                    <p 
                        className="text-base font-light"
                        style={{ color: '#8E8E93' }}
                    >
                        Monitor and manage your ongoing tasks
                    </p>
                </div>
                <div className="flex items-center space-x-3">
                    <div 
                        className="px-4 py-2 rounded-xl border"
                        style={{ 
                            backgroundColor: '#111111',
                            borderColor: '#1C1C1E',
                            color: '#E5E5E7'
                        }}
                    >
                        <span className="text-sm font-medium">
                            <span style={{ color: '#00D09C' }}>{tasks.filter(t => t.status === 'active').length}</span> Active
                        </span>
                    </div>
                    <button
                        className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150"
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
                        <span className="flex items-center space-x-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            <span>New Task</span>
                        </span>
                    </button>
                </div>
            </div>

            {/* Task Filters */}
            <div className="flex space-x-2">
                {['All', 'Active', 'Halted', 'Stopped'].map((filter) => (
                    <button
                        key={filter}
                        className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 border"
                        style={{ 
                            backgroundColor: filter === 'All' ? '#007AFF' : '#0A0A0A',
                            color: filter === 'All' ? '#FFFFFF' : '#8E8E93',
                            borderColor: filter === 'All' ? '#007AFF' : '#1C1C1E'
                        }}
                        onMouseEnter={(e) => {
                            if (filter !== 'All') {
                                e.target.style.backgroundColor = '#111111';
                                e.target.style.borderColor = '#1C1C1E';
                                e.target.style.color = '#E5E5E7';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (filter !== 'All') {
                                e.target.style.backgroundColor = '#0A0A0A';
                                e.target.style.borderColor = '#1C1C1E';
                                e.target.style.color = '#8E8E93';
                            }
                        }}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* Task Cards */}
            <div className="space-y-4">
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        query={task.query}
                        status={task.status}
                        onAction={(action) => handleTaskAction(task.id, action)}
                    />
                ))}
            </div>

            {/* Empty State */}
            {tasks.length === 0 && (
                <div 
                    className="text-center py-12 rounded-xl border"
                    style={{ 
                        backgroundColor: '#0D1B2A',
                        borderColor: '#3A86FF/20'
                    }}
                >
                    <div 
                        className="text-6xl mb-4"
                        style={{ color: '#3A86FF' }}
                    >
                        📋
                    </div>
                    <h3 
                        className="text-xl font-semibold mb-2"
                        style={{ color: '#FFFFFF' }}
                    >
                        No active tasks
                    </h3>
                    <p 
                        className="text-base mb-6"
                        style={{ color: '#E0E0E0' }}
                    >
                        Create your first task to get started with Donna
                    </p>
                    <button
                        className="px-6 py-3 rounded-lg text-sm font-medium transition-colors"
                        style={{ 
                            backgroundColor: '#3A86FF',
                            color: '#FFFFFF'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#265DF2'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#3A86FF'}
                    >
                        Create Task
                    </button>
                </div>
            )}
        </div>
    );
};

export default ActiveTasksPage;

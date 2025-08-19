import React, { useState, useEffect } from 'react';
import TaskCard from './TaskCard';
import TaskThreadModal from './TaskThreadModal';
// Import the JSON file for simulating the API call
import allTasksData from '../api responses/get_all_task_information.json';

const ActiveTasksPage = () => {
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
    const [selectedTask, setSelectedTask] = useState(null); // For modal
    const [activeFilter, setActiveFilter] = useState('All'); // 'All' | 'Active' | 'Halted' | 'Stopped'
    const [tasks, setTasks] = useState([]);

    // Simulate API call to load all tasks from JSON
    const loadAllTasks = async () => {
        // In a real app, you'd fetch from an API
        if (allTasksData && Array.isArray(allTasksData.payload)) {
            // Map the payload to the format expected by the UI
            const mapped = allTasksData.payload.map(t => ({
                id: t.task_id,
                query: t.task_query,
                // Map backend status to UI status
                status:
                    t.task_status === 'running' ? 'active'
                    : t.task_status === 'halted' ? 'halted'
                    : t.task_status === 'stopped' || t.task_status === 'completed' || t.task_status === 'failed' ? 'userStopped'
                    : 'unknown'
            }));
            setTasks(mapped);
        } else {
            setTasks([]);
        }
    };

    useEffect(() => {
        loadAllTasks();
    }, []);

    const handleTaskAction = (taskId, action) => {
        console.log(`Task ${taskId} action: ${action}`);
        // TODO: Implement task action logic
    };

    const handleTaskClick = (task) => {
        setSelectedTask(task);
    };

    const closeModal = () => {
        setSelectedTask(null);
    };

    const normalizedStatus = (label) => {
        switch (label) {
            case 'Active':
                return 'active';
            case 'Halted':
                return 'halted';
            case 'Stopped':
                return 'userStopped';
            default:
                return null;
        }
    };

    const filteredTasks = activeFilter === 'All'
        ? tasks
        : tasks.filter(t => t.status === normalizedStatus(activeFilter));

    return (
        <div className="min-h-full p-4 space-y-8" style={{ backgroundColor: '#000000' }}>
            {/* Header */}
            <div className="flex items-center justify-between pb-3">
                <h1 
                    className="text-2xl font-light tracking-tight"
                    style={{ color: '#FFFFFF' }}
                >
                    Active Tasks
                </h1>
                
                {/* Task Statistics Widgets */}
                <div className="flex items-center space-x-4">
                    {/* Active Tasks Widget */}
                    <div 
                        className="flex items-center space-x-2 px-3 py-1.5 rounded-lg"
                        style={{ 
                            backgroundColor: '#111111',
                            border: '1px solid #1C1C1E'
                        }}
                    >
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00D09C' }}></div>
                        <span className="text-xs font-medium" style={{ color: '#E5E5E7' }}>
                            <span className="font-semibold" style={{ color: '#00D09C' }}>
                                {tasks.filter(t => t.status === 'active').length}
                            </span>
                            <span className="ml-1">Active</span>
                        </span>
                    </div>


                    {/* Halted Tasks Widget */}
                    <div 
                        className="flex items-center space-x-2 px-3 py-1.5 rounded-lg"
                        style={{ 
                            backgroundColor: '#111111',
                            border: '1px solid #1C1C1E'
                        }}
                    >
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FF9500' }}></div>
                        <span className="text-xs font-medium" style={{ color: '#E5E5E7' }}>
                            <span className="font-semibold" style={{ color: '#FF9500' }}>
                                {tasks.filter(t => t.status === 'halted').length}
                            </span>
                            <span className="ml-1">Halted</span>
                        </span>
                    </div>


                    {/* Stopped Tasks Widget */}
                    <div 
                        className="flex items-center space-x-2 px-3 py-1.5 rounded-lg"
                        style={{ 
                            backgroundColor: '#111111',
                            border: '1px solid #1C1C1E'
                        }}
                    >
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FF3B30' }}></div>
                        <span className="text-xs font-medium" style={{ color: '#E5E5E7' }}>
                            <span className="font-semibold" style={{ color: '#FF3B30' }}>
                                {tasks.filter(t => t.status === 'userStopped').length}
                            </span>
                            <span className="ml-1">Stopped</span>
                        </span>
                    </div>
                </div>
            </div>


            {/* Task Filters and View Toggle */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex space-x-1.5">
                    {['All', 'Active', 'Halted', 'Stopped'].map((filter) => (
                        <button
                            key={filter}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 border"
                            style={{ 
                                backgroundColor: activeFilter === filter ? '#007AFF' : '#0A0A0A',
                                color: activeFilter === filter ? '#FFFFFF' : '#8E8E93',
                                borderColor: activeFilter === filter ? '#007AFF' : '#1C1C1E'
                            }}
                            onClick={() => setActiveFilter(filter)}
                            onMouseEnter={(e) => {
                                if (activeFilter !== filter) {
                                    e.target.style.backgroundColor = '#111111';
                                    e.target.style.borderColor = '#1C1C1E';
                                    e.target.style.color = '#E5E5E7';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (activeFilter !== filter) {
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

                {/* View Toggle */}
                <div className="flex items-center space-x-1 border rounded-lg p-1" style={{ borderColor: '#1C1C1E' }}>
                    <button
                        onClick={() => setViewMode('list')}
                        className="px-2 py-1 rounded text-xs transition-all duration-150"
                        style={{
                            backgroundColor: viewMode === 'list' ? '#007AFF' : 'transparent',
                            color: viewMode === 'list' ? '#FFFFFF' : '#8E8E93'
                        }}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                    </button>
                    <button
                        onClick={() => setViewMode('grid')}
                        className="px-2 py-1 rounded text-xs transition-all duration-150"
                        style={{
                            backgroundColor: viewMode === 'grid' ? '#007AFF' : 'transparent',
                            color: viewMode === 'grid' ? '#FFFFFF' : '#8E8E93'
                        }}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* <br /> */}


            {/* Task Cards */}
            <div className={viewMode === 'grid' ? 'pt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-30 pt-5'}>
                {filteredTasks.map((task) => (
                    <div key={task.id} className="cursor-pointer" onClick={() => handleTaskClick(task)}>
                        <TaskCard
                            id={task.id}
                            query={task.query}
                            status={task.status}
                            isClickable={true}
                        />
                        {viewMode != 'grid' && <div className="pb-6"/>}
                    </div>
                     
                     
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

            {/* Task Thread Modal */}
            {selectedTask && (
                <TaskThreadModal
                    task={selectedTask}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default ActiveTasksPage;

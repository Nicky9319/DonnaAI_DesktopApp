import React from 'react';
import ChatThread from '../../components/chat/ChatThread';

// Use the same tasks as in ActiveTasksPage
const activeTasks = [
    {
        id: 1,
        threadId: 'thread1',
        name: 'Quarterly Report Analysis',
        query: "Summarize the quarterly report and extract key insights for the executive presentation.",
        status: "active"
    },
    {
        id: 2,
        threadId: 'thread2',
        name: 'Data Pipeline Automation',
        query: "Generate a Python script to automate the data processing pipeline for customer analytics.",
        status: "halted"
    },
    {
        id: 3,
        threadId: 'thread3',
        name: 'Client Communication',
        query: "Send follow-up emails to all clients who haven't responded to our latest proposal.",
        status: "userStopped"
    },
    {
        id: 4,
        threadId: 'thread4',
        name: 'Investor Research',
        query: "Research and compile a list of potential investors for our Series A funding round.",
        status: "active"
    },
    {
        id: 5,
        threadId: 'thread5',
        name: 'Marketing Strategy',
        query: "Create a comprehensive marketing strategy for the new product launch next month.",
        status: "halted"
    }
];

const messages = {
    thread1: [
        { sender: 'user', text: 'Can you analyze the quarterly report and extract key insights for our executive presentation?' },
        { sender: 'ai', text: 'I\'ll analyze the quarterly report for you. Let me start by examining the financial metrics and performance indicators.' },
        { sender: 'user', text: 'Focus on revenue growth and customer acquisition costs.' },
        { sender: 'ai', text: 'Perfect! I\'ve identified that revenue grew 23% YoY, but customer acquisition costs increased by 15%. The main driver was increased marketing spend in Q3.' },
    ],
    thread2: [
        { sender: 'user', text: 'I need a Python script to automate our data processing pipeline for customer analytics.' },
        { sender: 'ai', text: 'I\'ll create a comprehensive Python script for your data processing pipeline. What specific data sources and transformations do you need?' },
        { sender: 'user', text: 'We have CSV files from multiple sources that need to be cleaned, merged, and aggregated.' },
        { sender: 'ai', text: 'I\'ve created a script that handles CSV processing, data cleaning, merging, and aggregation. It includes error handling and logging for monitoring.' },
    ],
    thread3: [
        { sender: 'user', text: 'Send follow-up emails to all clients who haven\'t responded to our latest proposal.' },
        { sender: 'ai', text: 'I\'ll help you send follow-up emails. Let me draft a professional follow-up message and identify the clients who haven\'t responded yet.' },
    ],
    thread4: [
        { sender: 'user', text: 'Research and compile a list of potential investors for our Series A funding round.' },
        { sender: 'ai', text: 'I\'ll research potential investors for your Series A round. What industry focus and investment size are you targeting?' },
        { sender: 'user', text: 'We\'re in the SaaS space, looking for $5-10M investment.' },
        { sender: 'ai', text: 'I\'ve compiled a list of 25 potential investors in the SaaS space who typically invest $5-10M in Series A rounds. Each includes their investment thesis and recent deals.' },
    ],
    thread5: [
        { sender: 'user', text: 'Create a comprehensive marketing strategy for the new product launch next month.' },
        { sender: 'ai', text: 'I\'ll develop a comprehensive marketing strategy for your product launch. Let me start by understanding your target audience and key value propositions.' },
    ],
};

const TaskThreadPage = () => {
    // Only show threads for tasks in the active task list
    const threads = activeTasks.map(task => ({ id: task.threadId, name: task.name }));

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="mb-6">
                <h1 
                    className="text-3xl font-bold mb-2"
                    style={{ color: '#FFFFFF' }}
                >
                    Task Threads
                </h1>
                <p 
                    className="text-lg"
                    style={{ color: '#E0E0E0' }}
                >
                    Review conversations and task progress
                </p>
            </div>

            {/* Chat Interface */}
            <div className="flex-1">
                <ChatThread 
                    threads={threads}
                    messages={messages}
                />
            </div>

            {/* Quick Actions */}
            <div className="mt-6 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <div 
                        className="px-4 py-2 rounded-lg border"
                        style={{ 
                            backgroundColor: '#0D1B2A',
                            borderColor: '#3A86FF/20',
                            color: '#E0E0E0'
                        }}
                    >
                        <span className="text-sm font-medium">
                            {threads.length} Threads
                        </span>
                    </div>
                    <div 
                        className="px-4 py-2 rounded-lg border"
                        style={{ 
                            backgroundColor: '#0D1B2A',
                            borderColor: '#3A86FF/20',
                            color: '#E0E0E0'
                        }}
                    >
                        <span className="text-sm font-medium">
                            {threads.reduce((acc, t) => acc + (messages[t.id]?.length || 0), 0)} Messages
                        </span>
                    </div>
                </div>
                
                <button
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    style={{ 
                        backgroundColor: '#3A86FF',
                        color: '#FFFFFF'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#265DF2'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#3A86FF'}
                >
                    + New Thread
                </button>
            </div>
        </div>
    );
};

export default TaskThreadPage;

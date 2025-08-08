import React from 'react';
import ChatThread from '../../chat/components/ChatThread';

const TaskThreadModal = ({ task, onClose }) => {
    if (!task) return null;

    // Sample messages for the task
    const messages = [
        { sender: 'user', text: task.query },
        { sender: 'ai', text: `I'll help you with this task: "${task.query}". Let me start working on it.` },
        { sender: 'user', text: 'Please provide more details about the requirements.' },
        { sender: 'ai', text: 'I\'ll analyze this thoroughly and provide you with a comprehensive solution.' },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
            <div className="w-full max-w-4xl h-[80vh] flex flex-col rounded-2xl overflow-hidden" style={{ backgroundColor: '#000000', border: '1px solid #1C1C1E' }}>
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: '#1C1C1E' }}>
                    <div className="flex-1">
                        <h2 className="text-xl font-light tracking-tight" style={{ color: '#FFFFFF' }}>
                            Task Thread
                        </h2>
                        <p className="text-sm mt-1" style={{ color: '#8E8E93' }}>
                            {task.query.length > 80 ? `${task.query.substring(0, 80)}...` : task.query}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150"
                        style={{ backgroundColor: '#111111' }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#1C1C1E';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#111111';
                        }}
                    >
                        <svg className="w-5 h-5" style={{ color: '#8E8E93' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Chat Thread */}
                <div className="flex-1">
                    <ChatThread messages={messages} />
                </div>
            </div>
        </div>
    );
};

export default TaskThreadModal;

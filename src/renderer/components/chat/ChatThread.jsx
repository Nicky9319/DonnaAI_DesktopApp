import React, { useState } from 'react';
import ChatMessage from './ChatMessage';

const ChatThread = ({ threads = [], messages = {} }) => {
    const [selectedThread, setSelectedThread] = useState(threads[0]?.id || '');

    return (
        <div className="h-full flex flex-col">
            {/* Thread Selector */}
            <div className="mb-6">
                <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: '#FFFFFF' }}
                >
                    Select Thread:
                </label>
                <select
                    className="w-full max-w-xs p-3 rounded-md text-sm transition-colors border"
                    style={{ 
                        backgroundColor: '#1A2332',
                        color: '#E0E0E0',
                        borderColor: '#2A3441'
                    }}
                    value={selectedThread}
                    onChange={(e) => setSelectedThread(e.target.value)}
                >
                    {threads.map(thread => (
                        <option key={thread.id} value={thread.id}>
                            {thread.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto">
                <div className="space-y-4">
                    {selectedThread && messages[selectedThread]?.map((msg, index) => (
                        <ChatMessage
                            key={index}
                            message={msg.text}
                            sender={msg.sender}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChatThread;

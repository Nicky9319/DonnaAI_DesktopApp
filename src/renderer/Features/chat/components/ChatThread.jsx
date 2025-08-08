import React, { useState } from 'react';
import ChatMessage from './ChatMessage';

const ChatThread = ({ threads = [], messages = {} }) => {
    const [selectedThread, setSelectedThread] = useState(threads[0]?.id || '');

    return (
        <div className="h-full flex flex-col" style={{ backgroundColor: '#0D1B2A' }}>
            {/* Thread Selector */}
            <div className="mb-8 p-6 border-b" style={{ borderColor: 'rgba(58, 134, 255, 0.1)' }}>
                <label 
                    className="block text-lg font-medium mb-4"
                    style={{ color: '#FFFFFF' }}
                >
                    Select Thread
                </label>
                <select
                    className="w-full max-w-md p-4 rounded-2xl text-sm transition-all duration-200 border backdrop-blur-sm focus:outline-none"
                    style={{ 
                        backgroundColor: 'rgba(26, 35, 50, 0.8)',
                        color: '#F1F1F1',
                        borderColor: 'rgba(58, 134, 255, 0.2)'
                    }}
                    value={selectedThread}
                    onChange={(e) => setSelectedThread(e.target.value)}
                    onFocus={(e) => {
                        e.target.style.borderColor = '#3A86FF';
                        e.target.style.boxShadow = '0 0 20px rgba(58, 134, 255, 0.3)';
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(58, 134, 255, 0.2)';
                        e.target.style.boxShadow = 'none';
                    }}
                >
                    {threads.map(thread => (
                        <option 
                            key={thread.id} 
                            value={thread.id}
                            style={{ 
                                backgroundColor: '#1A2332',
                                color: '#F1F1F1'
                            }}
                        >
                            {thread.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">
                {selectedThread && messages[selectedThread] ? (
                    <div className="space-y-4">
                        {messages[selectedThread].map((msg, index) => (
                            <ChatMessage
                                key={index}
                                message={msg.text}
                                sender={msg.sender}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center space-y-4">
                            <div 
                                className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center"
                                style={{ backgroundColor: 'rgba(58, 134, 255, 0.1)' }}
                            >
                                <svg 
                                    className="w-8 h-8" 
                                    style={{ color: '#3A86FF' }}
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <div>
                                <h3 
                                    className="text-xl font-medium mb-2"
                                    style={{ color: '#FFFFFF' }}
                                >
                                    No messages yet
                                </h3>
                                <p 
                                    className="text-sm"
                                    style={{ color: '#E0E0E0' }}
                                >
                                    Start a conversation with Donna
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-6 border-t" style={{ borderColor: 'rgba(58, 134, 255, 0.1)' }}>
                <div className="flex space-x-4">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 px-6 py-4 rounded-2xl border transition-all duration-200 focus:outline-none"
                        style={{
                            backgroundColor: 'rgba(26, 35, 50, 0.8)',
                            borderColor: 'rgba(58, 134, 255, 0.2)',
                            color: '#F1F1F1'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#3A86FF';
                            e.target.style.boxShadow = '0 0 20px rgba(58, 134, 255, 0.3)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(58, 134, 255, 0.2)';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                    <button
                        className="px-6 py-4 rounded-2xl transition-all duration-200 hover:scale-105"
                        style={{
                            backgroundColor: '#3A86FF',
                            color: '#FFFFFF',
                            boxShadow: '0 4px 20px rgba(58, 134, 255, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#265DF2';
                            e.target.style.boxShadow = '0 6px 24px rgba(58, 134, 255, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#3A86FF';
                            e.target.style.boxShadow = '0 4px 20px rgba(58, 134, 255, 0.3)';
                        }}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatThread;

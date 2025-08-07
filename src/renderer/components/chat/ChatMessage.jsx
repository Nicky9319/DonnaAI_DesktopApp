import React from 'react';

const ChatMessage = ({ message, sender }) => {
    const isUser = sender === 'user';
    
    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
            <div 
                className={`max-w-lg px-4 py-3 rounded-lg shadow-sm ${
                    isUser 
                        ? 'rounded-br-none' 
                        : 'rounded-bl-none'
                }`}
                style={{
                    backgroundColor: isUser ? '#3A86FF' : '#1A2332',
                    color: '#FFFFFF',
                    border: isUser ? 'none' : '1px solid #2A3441'
                }}
            >
                <div className="flex items-start space-x-2">
                    {!isUser && (
                        <div 
                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1"
                            style={{ backgroundColor: '#00D09C' }}
                        >
                            D
                        </div>
                    )}
                    <div className="flex-1">
                        <div className="text-sm font-medium mb-1" style={{ color: isUser ? '#FFFFFF' : '#00D09C' }}>
                            {isUser ? 'You' : 'Donna'}
                        </div>
                        <div className="text-sm leading-relaxed" style={{ color: '#E0E0E0' }}>
                            {message}
                        </div>
                    </div>
                    {isUser && (
                        <div 
                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1"
                            style={{ backgroundColor: '#3A86FF' }}
                        >
                            U
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;

import React from 'react';

const ChatMessage = ({ message, sender }) => {
    const isUser = sender === 'user';
    
    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
            <div 
                className={`max-w-2xl px-6 py-4 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl ${
                    isUser 
                        ? 'rounded-br-lg' 
                        : 'rounded-bl-lg'
                }`}
                style={{
                    backgroundColor: isUser ? '#3A86FF' : 'rgba(26, 35, 50, 0.9)',
                    color: '#FFFFFF',
                    border: isUser ? 'none' : '1px solid rgba(58, 134, 255, 0.2)',
                    boxShadow: isUser 
                        ? '0 8px 32px rgba(58, 134, 255, 0.3)' 
                        : '0 8px 32px rgba(0, 0, 0, 0.2)'
                }}
            >
                <div className="flex items-start space-x-3">
                    {!isUser && (
                        <div 
                            className="w-8 h-8 rounded-2xl flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1 shadow-lg"
                            style={{ 
                                backgroundColor: '#00D09C',
                                boxShadow: '0 4px 16px rgba(0, 208, 156, 0.3)'
                            }}
                        >
                            D
                        </div>
                    )}
                    <div className="flex-1">
                        <div 
                            className="text-sm font-semibold mb-2" 
                            style={{ color: isUser ? '#FFFFFF' : '#00D09C' }}
                        >
                            {isUser ? 'You' : 'Donna'}
                        </div>
                        <div 
                            className="text-base leading-relaxed"
                            style={{ color: isUser ? '#FFFFFF' : '#F1F1F1' }}
                        >
                            {message}
                        </div>
                    </div>
                    {isUser && (
                        <div 
                            className="w-8 h-8 rounded-2xl flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1 shadow-lg"
                            style={{ 
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                boxShadow: '0 4px 16px rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;

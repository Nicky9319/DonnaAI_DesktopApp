import React from 'react';

const TaskCard = ({ query, status, onAction }) => {
    const getStatusConfig = (status) => {
        switch (status) {
            case 'active':
                return {
                    color: '#00D09C',
                    label: 'Active',
                    bgColor: 'rgba(0, 208, 156, 0.2)',
                    icon: (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    )
                };
            case 'halted':
                return {
                    color: '#FF9500',
                    label: 'Halted',
                    bgColor: 'rgba(255, 149, 0, 0.2)',
                    icon: (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )
                };
            case 'userStopped':
                return {
                    color: '#FF3B30',
                    label: 'Stopped',
                    bgColor: 'rgba(255, 59, 48, 0.2)',
                    icon: (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10h6v4H9z" />
                        </svg>
                    )
                };
            default:
                return {
                    color: '#6B7280',
                    label: status,
                    bgColor: 'rgba(107, 114, 128, 0.2)',
                    icon: (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )
                };
        }
    };

    const statusConfig = getStatusConfig(status);

    return (
        <div 
            className="rounded-2xl p-4 border transition-all duration-150 hover:border-opacity-80 group" 
            style={{ 
                backgroundColor: '#111111',
                borderColor: '#1C1C1E'
            }}
        >
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2.5">
                    <div 
                        className="w-8 h-8 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: statusConfig.bgColor, color: statusConfig.color }}
                    >
                        {statusConfig.icon}
                    </div>
                    <div>
                        <span 
                            className="text-sm font-medium block"
                            style={{ color: statusConfig.color }}
                        >
                            {statusConfig.label}
                        </span>
                        <span 
                            className="text-xs"
                            style={{ color: '#8E8E93' }}
                        >
                            Task Status
                        </span>
                    </div>
                </div>
                {onAction && (
                    <button
                        onClick={() => onAction(status)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
                        style={{ 
                            backgroundColor: status === 'active' ? '#FF3B30' : '#007AFF',
                            color: '#FFFFFF'
                        }}
                        onMouseEnter={(e) => {
                            if (status === 'active') {
                                e.target.style.backgroundColor = '#D70015';
                                e.target.style.transform = 'scale(0.98)';
                            } else {
                                e.target.style.backgroundColor = '#0056CC';
                                e.target.style.transform = 'scale(0.98)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (status === 'active') {
                                e.target.style.backgroundColor = '#FF3B30';
                                e.target.style.transform = 'scale(1)';
                            } else {
                                e.target.style.backgroundColor = '#007AFF';
                                e.target.style.transform = 'scale(1)';
                            }
                        }}
                    >
                        <span className="flex items-center space-x-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {status === 'active' ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M9 10h6v4H9z" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1M9 16h6m-7 4h8a2 2 0 002-2V6a2 2 0 00-2-2H8a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                )}
                            </svg>
                            <span>{status === 'active' ? 'Stop' : 'Start'}</span>
                        </span>
                    </button>
                )}
            </div>
            <div 
                className="text-sm leading-relaxed"
                style={{ color: '#E5E5E7' }}
            >
                {query}
            </div>
        </div>
    );
};

export default TaskCard;
